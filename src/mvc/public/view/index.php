<?php
if ( isset($ctrl->arguments[0]) ){
	$id_note = $ctrl->arguments[0];
	$notes = new \bbn\Appui\Note($ctrl->db);
  $note = $notes->get($id_note);
	$ctrl->obj->content = $note['content'];
}
