<?php
/*
 * Describe what it does!
 *
 **/

/** @var $model \bbn\Mvc\Model*/
if ($model->hasData('id', true)) {
  $em = new bbn\User\Email($model->db);
  $email =  $em->getEmail($model->data['id']);
  $config = HTMLPurifier_Config::createDefault();
  $purifier = new HTMLPurifier($config);
  $email['html'] =  $purifier->purify(quoted_printable_decode($email['html']));
  return $email;
}