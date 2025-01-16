<!-- HTML Document -->
<div class="bbn-100" v-if="test">
  <div class="bbn-overlay" style="height: 100vh;">
    <div class="bbn-flex-height">
      <bbn-toolbar class="bbn-m">
        <bbn-button icon="nf nf-fa-mail_reply"
                    class="bbn-left-xsspace"
                    :label="_('Reply')"
                    :notext="true"
                    @click="reply"/>
        <bbn-button icon="nf nf-fa-mail_reply_all"
                    class="bbn-left-xsspace"
                    :label="_('Reply All')"
                    :notext="true"
                    @click="replyAll"/>
        <bbn-button icon="nf nf-fa-mail_forward"
                    class="bbn-left-xsspace"
                    :label="_('Forward')"
                    :notext="true"
                    @click="forward"/>
        <bbn-button icon="nf nf-md-tab_plus"
                    class="bbn-left-xsspace"
                    :label="_('Open in a new tab')"
                    :notext="true"
                    @click="openTab"/>
        <bbn-button icon="nf nf-md-window_restore"
                    class="bbn-left-xsspace"
                    :label="_('Open in a new window')"
                    :notext="true"
                    @click="openWindow"/>
        <bbn-button icon="nf nf-fa-archive"
                    class="bbn-left-xsspace"
                    :label="_('Archive')"
                    :notext="true"
                    @click="archive"/>
        <bbn-button icon="nf nf-weather-fire"
                    class="bbn-left-xsspace"
                    :label="_('Set as junk')"
                    :notext="true"
                    @click="setAsJunk"/>
        <bbn-button icon="nf nf-md-delete"
                    class="bbn-left-xsspace"
                    :label="_('Delete')"
                    :notext="true"
                    @click="deleteMail"/>
        <bbn-button icon="nf nf-fa-bug"
                    class="bbn-left-xsspace"
                    :label="_('Transform in task')"
                    :notext="true"
                    @click="mailToTask"/>
        <bbn-treedown :placeholder="_('Move to')"
                      class="bbn-wide bbn-left-xsspace"
                      :source="treeData"/>
      </bbn-toolbar>
      <div class="bbn-flex-fill">
        <bbn-frame :src="url + source.root + 'reader/' + source.id" class="bbn-100"></bbn-frame>
      </div>
    </div>
  </div>
</div>