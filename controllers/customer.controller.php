<?php
error_reporting(E_ERROR);
require_once "../helpers/env.php";

$env = new Env();
$x_api_key = $env->env("X_API_KEY");
$base_url = $env->env("BASE_URL");

extract($_POST);
 switch ($tbp){
     case 0:
         try {
             $curl = curl_init();
             curl_setopt_array($curl, array(
                 CURLOPT_URL => "$base_url/v1/landings/credentials",
                 CURLOPT_RETURNTRANSFER => true,
                 CURLOPT_ENCODING => '',
                 CURLOPT_MAXREDIRS => 10,
                 CURLOPT_TIMEOUT => 0,
                 CURLOPT_FOLLOWLOCATION => true,
                 CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                 CURLOPT_CUSTOMREQUEST => 'GET',
                 CURLOPT_HTTPHEADER => array(
                     'x-api-key: '.$x_api_key,
                     'Accept: application/json'
                 ),
             ));
             $response = curl_exec($curl);
             curl_close($curl);
             echo $response;
         } catch (Exception $e) {
             $response = array(
                 'status' => 500,
                 'data' => 'Excepcion capturada: ', $e->getMessage()
             );
             echo json_encode($response);
         }
      break;
     case 1:
         try {
             $curl = curl_init();
             curl_setopt_array($curl, array(
                 CURLOPT_URL => "$base_url/v1/clients",
                 CURLOPT_RETURNTRANSFER => true,
                 CURLOPT_ENCODING => '',
                 CURLOPT_MAXREDIRS => 10,
                 CURLOPT_TIMEOUT => 0,
                 CURLOPT_FOLLOWLOCATION => true,
                 CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                 CURLOPT_CUSTOMREQUEST => 'POST',
                 CURLOPT_POSTFIELDS => array('nombre' => $names,'cedula' => $identification,'telefono' => $tel,'correo' => $email,'ciudad' => $city,'direccion' => $direccion,'campo1' => $apellidos),
                 CURLOPT_HTTPHEADER => array(
                     'x-api-key: '.$x_api_key,
                     'Accept: application/json'
                 ),
             ));
             $response = curl_exec($curl);
             curl_close($curl);
             echo $response;
         } catch (Exception $e) {
             $response = array(
                 'status' => 500,
                 'data' => 'Excepcion capturada: ', $e->getMessage()
             );
             echo json_encode($response);
         }
         break;
     case 2:
         try {
             $curl = curl_init();
             curl_setopt_array($curl, array(
                 CURLOPT_URL => "$base_url/v1/clients/payments/confirm?id=$id&clientTransactionId=$clientTransactionId&ctoken=$ctoken",
                 CURLOPT_RETURNTRANSFER => true,
                 CURLOPT_ENCODING => '',
                 CURLOPT_MAXREDIRS => 10,
                 CURLOPT_TIMEOUT => 0,
                 CURLOPT_FOLLOWLOCATION => true,
                 CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                 CURLOPT_CUSTOMREQUEST => 'GET',
                 CURLOPT_HTTPHEADER => array(
                     'x-api-key: '.$x_api_key,
                     'Accept: application/json'
                 ),
             ));
             $response = curl_exec($curl);
             curl_close($curl);
             echo $response;
         } catch (Exception $e) {
             $response = array(
                 'status' => 500,
                 'data' => 'Excepcin capturada: ', $e->getMessage()
             );
             echo json_encode($response);
         }
         break;
        case 3:
            try {
                $curl = curl_init();
                curl_setopt_array($curl, array(
                    CURLOPT_URL => "$base_url/v1/clients/send-mail",
                    CURLOPT_RETURNTRANSFER => true,
                    CURLOPT_ENCODING => '',
                    CURLOPT_MAXREDIRS => 10,
                    CURLOPT_TIMEOUT => 0,
                    CURLOPT_FOLLOWLOCATION => true,
                    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                    CURLOPT_CUSTOMREQUEST => 'POST',
                    CURLOPT_POSTFIELDS => array('clientTransactionId' => $clientTransactionId),
                    CURLOPT_HTTPHEADER => array(
                        'x-api-key: '.$x_api_key,
                        'Accept: application/json'
                    ),
                ));
                $response = curl_exec($curl);
                curl_close($curl);
                echo $response;
            } catch (Exception $e) {
                $response = array(
                    'status' => 500,
                    'data' => 'Excepcion capturada: ', $e->getMessage()
                );
                echo json_encode($response);
            }
            break;
 }