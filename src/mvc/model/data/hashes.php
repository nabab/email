<?php
/**
 * What is my purpose?
 *
 **/

use bbn\X;
use bbn\Str;
/** @var bbn\Mvc\Model $model */

$em = new bbn\User\Email($model->db, $model->inc->user, $model->inc->pref);

return [
  'hashes' => $em->getHashes();
];