<?php
$v=(file_get_contents("php://input"));
//var_dump($v);
//var_dump(json_decode($v,true));
$a = array ('code'=>3,'data'=>null,'error'=>'-111'); 
echo json_encode($a);
?>