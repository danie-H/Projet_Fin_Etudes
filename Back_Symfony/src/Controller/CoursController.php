<?php

namespace App\Controller;

use PhpParser\Node\Expr\Cast\String_;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class CoursController extends AbstractController
{
    
          
     /**
     * @Route("/api/planning/{promotion}/ajouterCours", name="api_planning_ajouterCours", methods={"POST"})        
     */
    public function ajouterCours(Request $request, String $promotion)        
    {


      // A utiliser pour la modification du fichier json d'une promo particulière
      // $nompro = $request->get("nom_promo");                          
      //   $files = $nompro . ".json";      
      //   $semaines = json_decode(file_get_contents($files), true);

        $data = json_decode($request->getContent(), true);
        $nom = $data['nom'];  
        $type = $data["type"];      
        $prof = $data["prof"];    
        $jour = $data["jour"];  
        $heure =  $data["heure"]; 
        $semaine = $data["semaine"];
        $GROUPS =  $data['groups'];       
        
        // Danielle envoie les données sous la forme $groups = {"groupe1", "groupe2", "groupe3"}    
        // Je dois donc récupérer la taille de $groups et remplir ma variable $GROUPS correspondante   
        // A la fin je dois apporter les modifs correspondantes au projet Symfony_Calendar 
       
        $t = 0;    
            
        // Récupérons les différents groupes 
        /*
        $compt = 0; 
        $tour = 0;
        $i = 0; 
        $firstime = 0;  */                       
      
      // Il ne manque plus qu'à insérer les données dans la semaine 
      $suivant = 0; 

      $nom_promotion = "";     

      $niveau_formation = "";  

      for($i=0; $i<strlen($promotion);$i++){

          if(($promotion[$i] != "_") &&($suivant == 0) ){
              $nom_promotion .=  $promotion[$i]; 

          } else{
              if( $promotion[$i] == "_"){
                $suivant++;
              } else {
                  if( $suivant != 0 ){
                      $niveau_formation .= $promotion[$i];

                  }

              }

          }
      }

   // dd( $nom_promotion, $niveau_formation);     

    $nom_promotion = str_replace(' ', '', $nom_promotion);    
    $niveau_formation = str_replace(' ', '', $niveau_formation);

    $fichier = $nom_promotion . "_" . $niveau_formation . ".json";                   
                             
    $semaines = json_decode(file_get_contents($fichier), true); 
        // $index  = 0;    
       
       $g = "groupe"; 
       $next  = 0;              
       // dd($GROUPS);    
        $val = 0; 


       for($t = 0; $t < count($GROUPS); $t++){     
         
         $next++;
         
         $g = "groupe"  . strval($next);    
        
        for($j = 0; $j < count($semaines); $j++){   
               
          if(($semaines[$j]["nom"] == $semaine)){  
            
       
            if( $semaines[$j][$g]["group_name"] == $GROUPS[$t] ){ 

              $semaines[$j][$g][$jour][$heure]["nom"] = $nom;
              $semaines[$j][$g][$jour][$heure]["type"] = $type;
              $semaines[$j][$g][$jour][$heure]["profs"] = $prof;
              

            }

                     
          }  
                                                                           
      
       } 
      
    }   
       
       
       //dd($semaines);                                             


     file_put_contents($fichier, json_encode($semaines));    
      
            
      return $this->json($semaines);                                    
        
    }

                                      
     /**
     * @Route("/api/planning/fixerCours/{id}", name="api_planning_fixerCours", methods={"POST"},requirements={"id"="\d+"})            
     */
    public function fixerCours(Request $request)             
    { 
                                                                       
      $id =  $request->get("id");                     
      $group = $request->get("group");      
      $jour = $request->get("jour");  
      $heure =  $request->get("heure");     
         
      $semaines = json_decode(file_get_contents('semaines.json'), true);      
                  
      for($j = 0; $j < count($semaines); $j++){

                   
        if(($semaines[$j]["id"] == $id)){              

              
          if($semaines[$j][$group][$jour][$heure]["fixed"] == 0){      

            $semaines[$j][$group][$jour][$heure]["fixed"] = 1; 

          }else{
             
            $semaines[$j][$group][$jour][$heure]["fixed"] = 0; 
                  
          }  

                            
        }                   
                                                                      
    }                                
      
      file_put_contents('semaines.json',json_encode($semaines));                               
                           
      return $this->json($semaines);                     
          
    }


    
     /**
     * @Route("/api/planning/copierCours", name="api_planning_copierCours", methods={"POST"})        
     */
    public function copy(Request $request)        
    {
      
        $nom = $request->get("nom");             
        $type = $request->get("type");   
        $prof = $request->get("prof");
        $jour = $request->get("jour");
        $heure =  $request->get("heure");      
        $group = $request->get("group");
        $debut = $request->get("debut");      
        $fin = $request->get("fin");      
        $heure_fin =  $request->get("heure_fin");   

        
        $dif = intval(substr($heure_fin,-1,1)) - intval(substr($heure,-1,1));        
        $start = intval(substr($heure,-1,1));
       
        $end =  intval(substr($heure_fin,-1,1));             

        $semaines = json_decode(file_get_contents('semaines.json'), true); 
        
        $m = "m";          
        $h = "";                                         

        if($dif > 0){
          
          $start++;   
                 
        for($j = 0; $j < count($semaines); $j++){

                   
          if(($semaines[$j]["date_debut"] == $debut) && ($semaines[$j]["date_fin"] == $fin)){

                 
            for($k= $start; $k <= $end; $k++){

              $h  = $m . strval($k); 
              

              $semaines[$j][$group][$jour][$h]["nom"] = $nom;
              $semaines[$j][$group][$jour][$h]["type"] = $type;
              $semaines[$j][$group][$jour][$h]["profs"] = $prof;      

            }
            
                     
          }  
                                                                        
      }       
   
        }
        else{       

             
          $start--;   
                 
          for($j = 0; $j < count($semaines); $j++){
  
                     
            if(($semaines[$j]["date_debut"] == $debut) && ($semaines[$j]["date_fin"] == $fin)){
  
                   
              for($k= $start; $k >= $end; $k--){
  
                $h  = $m . strval($k);    
                           
                $semaines[$j][$group][$jour][$h]["nom"] = $nom;
                $semaines[$j][$group][$jour][$h]["type"] = $type;
                $semaines[$j][$group][$jour][$h]["profs"] = $prof;      
  
              }
              
                       
            }     
                                                                          
        }       

    
        }
    

      file_put_contents('semaines.json', json_encode($semaines));    
               
      return $this->json($semaines);  
         
    }
        
      /**
     * @Route("/api/planning/{promotion}/supprimerCours", name="api_planning_supprimerCours", methods={"POST"})                
     */
    public function delete(Request $request, String $promotion)        
    {                
      // A utiliser pour la modification du fichier json d'une promo particulière
      // $nompro = $request->get("nom_promo");                          
      //   $files = $nompro . ".json";      
      //   $semaines = json_decode(file_get_contents($files), true);
         
      $data = json_decode($request->getContent(), true);
             
      // Faut que Danielle envoie aussi le nom, le type et le prof pour qu'on supprime le bon cours       
      $nom = $data['nom'];  
      $type = $data["type"];            
      $prof = $data["prof"];       
      $jour = $data["jour"];  
      $heure =  $data["heure"]; 
      $semaine = $data["semaine"];                
      $GROUPS =  $data['groups'];      
  
      
       $t = 0;    
           
       // Récupérons les différents groupes 
       /*
       $compt = 0; 
       $tour = 0;
       $i = 0; 
       $firstime = 0;      
       */            
     
     // Il ne manque plus qu'à insérer les données dans la semaine                    
     $suivant = 0; 

     $nom_promotion = "";     

     $niveau_formation = "";  

     for($i=0; $i<strlen($promotion);$i++){

         if(($promotion[$i] != "_") &&($suivant == 0) ){
             $nom_promotion .=  $promotion[$i]; 

         } else{
             if( $promotion[$i] == "_"){
               $suivant++;
             } else {
                 if( $suivant != 0 ){
                     $niveau_formation .= $promotion[$i];

                 }

             }

         }
     }       
     
    $nom_promotion = str_replace(' ', '', $nom_promotion);    
    $niveau_formation = str_replace(' ', '', $niveau_formation);

    $fichier = $nom_promotion . "_" . $niveau_formation . ".json"; 

      $semaines = json_decode(file_get_contents($fichier), true); 
      //$index  = 0;   
      
      $g = "groupe"; 
      $next  = 0;                
      
      for($t = 0; $t < count($GROUPS); $t++){     
        
        //$g = $GROUPS[$t];                         
        $next++;
        $g = $g . strval($next);   

       for($j = 0; $j < count($semaines); $j++){  
              
         if(($semaines[$j]["nom"] == $semaine)){
           if( $semaines[$j][$g]["group_name"] == $GROUPS[$t] ){         
               
             
            if( ($semaines[$j][$g][$jour][$heure]["nom"] == $nom) && ($semaines[$j][$g][$jour][$heure]["type"] == $type) &&  ($semaines[$j][$g][$jour][$heure]["profs"] == $prof)){

              $semaines[$j][$g][$jour][$heure]["nom"] = "";
              $semaines[$j][$g][$jour][$heure]["type"] = "";             
              $semaines[$j][$g][$jour][$heure]["profs"] = "";
    
            }
         
    
           }

                        
         }  
                                                                          
     }    
                     
   }        
                     
     //dd($semaines);                     

     file_put_contents($fichier, json_encode($semaines));    
            
     return $this->json($semaines);                                            
        
    }
        

           
}
         