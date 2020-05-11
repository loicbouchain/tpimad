//Question 1 :

db.places.insertMany( [{
    name: "Louvre",
    location: { type: "Point", coordinates: [ 48.8587318,2.3304874 ] },
},{
    name: "Musée Orsay",
    location: { type: "Point", coordinates: [ 48.8599741,2.3274404 ] },
},{
    name: "Place de la concorde",
    location: { type: "Point", coordinates: [ 48.8599741,2.3274404 ] },
} ]);
//Ne pas oublier de créer l'index sur location
db.places.createIndex( { location: "2dsphere" } )


//Question 2 :
 db.places.findOne(
    {
        location: {
         $near: {
           $geometry: {
              type: "Point" ,
              coordinates: [48.8689334 ,2.3164475]
           },
         }
       }
    })
// les résultats sont ordonnés par le plus près, donc findOne permet de récupérer le point le plus près

//Question 3 
db.places.find(
    { location : 
        { $geoWithin: 
            { $geometry: { type: "Polygon", coordinates:[[[48.8617, 2.34048],[48.85652, 2.33495],[48.85977, 2.31894],[48.86433, 2.32501],[48.8617, 2.34048]]] } }  
    } 
})
//zone sans place de la concorde

//Question 4 
db.places.find(
    { location : 
        { $geoWithin: 
            { $center: [ [ 48.83047, 2.28718 ] , 0.05 ] }  // trouve les points dans un rayons de 5 km , mes points étant très proche les uns des autres ont trouve 2 résultats
    } 
})


  