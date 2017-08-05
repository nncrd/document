<?php
echo "1111";
$v=(file_get_contents("php://input"));
var_dump($v);
var_dump(json_decode($v,true));
echo "2222";
?>