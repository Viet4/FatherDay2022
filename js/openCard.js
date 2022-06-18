var gameState = 0;
AFRAME.registerComponent("open-card", {
  init: function(){
    this.handleMouse();
  },
  handleMouse: function(){
    this.el.addEventListener("mouseenter", ()=>{
      this.handleItem(true);
    });
    this.el.addEventListener("mouseleave", ()=>{
      this.handleItem(false);
    });
    this.el.addEventListener("mousedown", ()=>{
      const camera = document.querySelector("#camera");
      camera.setAttribute("animation", {
        property:"position",
        to:{x:0, y:0, z:0},
        dur:500,
        easing:"linear"
      });
    });
  },
  handleItem: function(selected){
    const id = this.el.getAttribute("id");

    if (id === "card-page-1-container"){
      const cardBorder = document.querySelector("#card-page-1-border");

      var opacity;
      if (selected) {opacity = 1}
      else {opacity = 0};

      cardBorder.setAttribute("material", {opacity: opacity});

      this.el.addEventListener("mousedown", ()=>{
        this.handleMouseClick();
      });
    }
  },
  handleMouseClick: function(){
    const cardContainer = document.querySelector("#card-page-1-container");
    cardContainer.setAttribute("animation", {
      property:"rotation",
      to:{x:0, y:-180, z:0},
      dur:2000,
      easing:"linear"
    });
    const cardPg2 = document.querySelector("#card-page-2");
    cardPg2.setAttribute("material", {opacity: 1});

    var itemContainer = document.querySelector("#item-container")

    if (gameState === 0){
      gameState = 1;
      setTimeout(function(){
        var animationContainer = document.createElement("a-entity");
        animationContainer.setAttribute("position", {x:-3,y:1.5,z:-12});
        animationContainer.setAttribute("animation", {
          property:"position",
          to:{x:-3, y:-0.35, z:-12},
          dur:24000,
          easing:"linear"
        });

        var hammer = document.createElement("a-entity");
        hammer.setAttribute("id", "hammer");
        hammer.setAttribute("rotation", {x:0,y:90,z:0});
        hammer.setAttribute("gltf-model", "./assets/hammer/scene.gltf");
        hammer.setAttribute("scale", {x:10,y:10,z:10});
        hammer.setAttribute("animation", {
          property:"rotation",
          from:{x:0,y:90,z:0},
          to:{x:-45,y:90,z:0},
          dur:2000,
          loop:true,
          easing:"linear"
        });

        var nail = document.createElement("a-entity");
        nail.setAttribute("id", "nail");
        nail.setAttribute("position", {x:-2.25,y:-.5,z:0});
        nail.setAttribute("rotation", {x:0,y:0,z:90});
        nail.setAttribute("gltf-model", "./assets/nail_2_8x70/scene.gltf");
        nail.setAttribute("scale", {x:.75,y:.75,z:.75});

        var wood = document.createElement("a-entity");
        wood.setAttribute("id", "wood");
        wood.setAttribute("position", {x:-4.25,y:0,z:-12});
        wood.setAttribute("rotation", {x:0,y:0,z:0});
        wood.setAttribute("gltf-model", "./assets/stylized_wood_plank/scene.gltf");
        wood.setAttribute("scale", {x:.025,y:.025,z:.025});

        itemContainer.appendChild(animationContainer);
        animationContainer.appendChild(hammer);
        animationContainer.appendChild(nail);
        itemContainer.appendChild(wood);
      },2000);

      setTimeout(function(){
        var camera = document.querySelector("#camera");
        var text = document.createElement("a-entity");
        text.setAttribute("position", {x:0, y:0.125, z:-1});
        text.setAttribute("text", {
          value: "Happy Father's Day",
          font: "mozillavr",
          color: "#000",
          align: "center",
          width: 5
        });
        camera.appendChild(text);
      }, 26000)
    }
  }
});