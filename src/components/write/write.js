// Javascript Document

(() => {
  let translate =  {
    from: bbn._('From'),
    send: bbn._('Send'),
    to: bbn._('To'),
    subject: bbn._('Subject'),
    unknown: bbn._('Unknown'),
  };
  return {
    props: {
      replyTo: {
        type: String
      },
      references: {
        type: String
      },
      isReply: {
        required: true,
        type: Boolean
      },
      source: {
        required: true,
        type: Object,
      },
      subject: {
        type: String,
        default: "",
      },
      to: {
        type: String,
        default: "",
      },
      CC: {
        type: String,
        default: "",
      },
      CCI: {
        type: String,
        default: "",
      },
      accounts: {
        type: Array,
        default: [],
      },
      signatures: {
        type: Array,
        default: [],
      },
      attachment: {
        type: Array,
        defaut: [],
      }
    },
    data() {
      return {
        trlt: {
          from: bbn._('From'),
          send: bbn._('Send'),
          to: bbn._('To'),
          subject: bbn._('Subject'),
          unknown: bbn._('Unknown'),
          editor: bbn._('Editor'),
          cc: bbn._('CC'),
          cci: bbn._('BCC'),
          signatures: bbn._('Signatures')
        },
        rootUrl: appui.plugins['appui-email'],
        ccButton: true,
        cciButton: false,
        attachmentsModel: [],
        attachments: this.attachment,
        currentTo: "",
        currentCC: "",
        currentCCI: "",
        currentFrom: this.accounts[0].value ?? "",
        currentSignature: this.signatures.length ? this.signatures[0].id : null,
        type: "bbn-rte",
        types: [
          {value: "bbn-rte", text: bbn._('Rich text editor')},
          {value: "bbn-markdown", text: bbn._('Markdown')},
          {value: "bbn-textarea", text: bbn._('Text')}
        ],
        currentSubject: this.subject,
        message: (this.source.html && this.source.html != "") ? this.source.html : this.source.plain,
        originalMessage: "",
        messageTypeIcon: "nf nf-seti-html",
        messageTypeText: 'html',
      };
    },
    mounted() {
      if (this.source && this.source.login && this.source.login.includes('@bbn.so')) {
        this.to = this.to.replace(this.source.login + ' ', '');
      }
      this.originalMessage = this.message
      this.currentTo = this.to;
      this.currentCC = this.CC;
      this.currentCCI = this.CCI;
      bbn.fn.log("ACCOUNT", this.accounts);
    },
    methods: {
      // try to find the original mail if is found add the signature beetween original mail and new mail otherwise add the signature at the front
      addSignature() {
        if (this.currentSignature) {
          const signature = bbn.fn.getRow(this.signatures, {id: this.currentSignature});
          // check if message is a response from an email
          if (this.originalMessage) {
            // trying to replace the email responded
            let canAddAtEnd = false;
            this.message.replace(this.originalMessage, (token) => {
              canAddAtEnd = true;
              return "";
            })
            // if email found replace it by the signature and place it after the signature
            if (canAddAtEnd) {
              this.message = this.message.replace(this.originalMessage, '\n\n\n' + signature.signature + '\n') + this.originalMessage;
            // else put the signature at the top of the email
            } else {
              this.message = '\n\n\n' + signature.signature + '\n' + this.message
            }
          // if is a new email
          } else {
            // check if user have writed email and place tha signature at the end
            if (this.message) {
            	this.message = this.message + '\n\n\n' + signature.signature + '\n'
            // otherwise place it directly because the email is empty
            } else {
              this.message = '\n\n\n' + signature.signature + '\n'
            }
          }
        }
      },
      setType(type) {
        this.type = type;
        if (type == "bbn-textarea") {
          this.message = this.source.plain;
        } else {
          this.message = this.source.html;
        }
      },
      createEmailListString(array) {
        let res = "";
        for (let i = 0; i < array.length;i++) {
          res += array[i].mailbox + '@' +array[i].host + ' ';
        }
        return res;
      },
      send() {
        const toInputItem = this.getRef('toInput').items
        const ccInputItem = this.getRef('ccInput').items
        const cciInputItem = this.getRef('cciInput').items
        const pluck = (objs, property) => objs.map((obj) => obj[property]);
        const to = toInputItem && toInputItem.length ? pluck(toInputItem, 'email').join(';') : ""
        const cc = ccInputItem && ccInputItem.length ? pluck(ccInputItem, 'email').join(';') : ""
        const cci = cciInputItem && cciInputItem.length ? pluck(cciInputItem, 'email').join(';') : ""
        bbn.fn.post(appui.plugins['appui-email'] + '/actions/email/send', {
          id_account: this.currentFrom,
          email: {
            title: this.currentSubject,
            text: this.message,
            to: to,
            cc: cc,
            bcc: cci,
            attachments: this.attachments,
            important: 0,
            in_reply_to: `<${this.replyTo}>`,
            references: this.references ? this.references + ` <${this.replyTo}>` : `<${this.replyTo}>`
          }
        })
      },
      openContacts(type) {
        this.getPopup({
          component:  'appui-email-popup-contacts',
          label: bbn._('Address book'),
          width: '35vw',
          height: '50vh',
          componentOptions: {
            component: this.getRef(type + 'Input')
          }
        });
      },
      openSignatureEditor(action) {
        bbn.fn.log('idx', this.currentSignature);
        this.getPopup({
          component: 'appui-email-popup-editsignatures',
          label: bbn._('Signature Editor'),
          width: '60vw',
          height: '60vh',
          componentOptions: {
            signatures: this.signatures,
            selected: this.currentSignature
          }
        })
      },
      updateSign() {
        bbn.fn.post(appui.plugins['appui-email'] + '/actions/signatures/get', {}, (d) => {
          if (d.success) {
            this.signature = d.res;
          } else {
            appui.error(bbn._('Impossible to update signatures'))
          }
        })
      },
      uploadSuccess(field, fileName, responseData, response) {
        bbn.fn.log(responseData);
        this.attachments.push(responseData.path);
      },
      currentToSetter(newValue) {
        this.currentTo = newValue;
      },
      currentCCSetter(newValue) {
        this.currentCC = newValue;
      },
      currentCCISetter(newValue) {
        this.currentCCI = newValue;
      }
    }
  }
})()