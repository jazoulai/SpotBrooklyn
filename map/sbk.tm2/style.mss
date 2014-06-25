// Languages: name (local), name_en, name_fr, name_es, name_de
@name: '[name_en]';

// Common Colors //
@water: #c3e6ff;
@park: #cec;

Map {
  background-color:#fff;
}

#landuse {
  [class='park'] { 
     polygon-fill: @park;
  	 line-width: .4;
     line-color: #009c84;
     line-opacity: .7;
  }
  [class='cemetery'] {
    polygon-fill: #ddddd4;
  }
  [class='sand'] 
     {
    polygon-fill: #ffbb00;
  	} 
}

#water {
  polygon-fill: @water;
  polygon-gamma: 0.6;
  line-width: .4;
  line-color: #009c84;
  line-opacity: .5;
}

#road {
  [class='motorway'],
  [class='motorway_link'],
  [class='main'] {
    [zoom>=11] {
      line-color: #f9f0e3;
       line-width: 2
    }
    [zoom=12] {
      line-width: 2;
    }
    [zoom=13] {
      line-width: 4;
    }
    [zoom=14] {
      line-width: 4;
    }
    [zoom=15] {
      line-width: 8;
    }
    [zoom=16] {
      line-width: 12;
    }
    [zoom>=17] {
      line-width: 14;
    }
    [zoom>=18] {
      line-width: 16;
    }
    [zoom>=19] {
      line-width: 18;
    }
    [zoom>=19] {
      line-width: 19;
    }
    [zoom>=20] {
      line-width: 20;
    }
    [zoom>=21] {
      line-width: 21;
    }
    [zoom>=22] {
      line-width: 22;
    }
  }
}

#road {
  [class='street'] {
    [zoom>=11] {
      line-color: #000;
    }
    [zoom<=12] {
      line-width:.5;
    }
    [zoom=13] {
      line-width: 1;
    }
    [zoom=14] {
      line-width: 2;
    }
    [zoom=15] {
      line-width: 8;
    }
    [zoom=16] {
      line-width: 12;
    }
    [zoom>=17] {
      line-width: 14;
    }
    [zoom>=18] {
      line-width: 16;
    }
    [zoom>=19] {
      line-width: 18;
    }
    [zoom>=19] {
      line-width: 19;
    }
    [zoom>=20] {
      line-width: 20;
    }
    [zoom>=21] {
      line-width: 21;
    }
    [zoom>=22] {
      line-width: 22;
    }
  }
}








#road_label 
  [zoom=17]{  
    [class='main'],  
    [class='street']{
     text-name: [name];
     text-face-name: 'Roboto Thin';
     text-size: 11;   
     text-placement: line;
     text-fill: #000;
     text-halo-fill: #fff;
     text-halo-radius: 2;   
     text-min-path-length: 100;
     text-character-spacing: 2; 
     text-spacing: 10000;
     text-allow-overlap: false;
  }
}

