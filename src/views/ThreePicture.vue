<template>
  <div class="main">
    <div id="container"></div>
    <div id="menu">
      <button id="table">TABLE</button>
      <button id="sphere">SPHERE</button>
      <button id="helix">HELIX</button>
      <button id="grid">GRID</button>
      <button @click="addOnePerson">add</button>
    </div>
    <div class="qrcode">
      <p>扫码参与活动</p>
      <img src="../assets/qrcode.jpg" alt="" />
    </div>
  </div>
</template>
<script>
import * as THREE from "three";
import { OBJLoader, MTLLoader } from "three-obj-mtl-loader";
import { CSS2DRenderer, CSS2DObject } from "three-css2drender";
import TWEEN from "tween.js";
import { CSS3DRenderer, CSS3DObject } from "three-css3drenderer";
import { TrackballControls } from "../assets/js/TrackballControls";
import socket from "../services/socket";
import { mapGetters } from "vuex";
export default {
  name: "ThreePicture",
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      controls: null,

      objects: [],
      targets: { table: [], sphere: [], helix: [], grid: [] },
      currentTarget: "table",
      geometry: null,
      material: null,
      mesh: null,
      imageUrl: require("../assets/logo.png"),
    };
  },
  computed: {
    ...mapGetters(["table"]),
  },
  created() {
    console.log(socket);
    this.currentTarget = "table";
    /* for (let i = 0; i < 10; i++) {
      this.table.push({ src: this.imageUrl });
    } */
  },
  watch: {
    table: {
      deep: true,
      handler: function(v, ov) {
        this.setOneElement(v[v.length - 1]);
        this.addOneTable();
        this.addOneSphere();
        this.addOneGrid();
        this.addOneHelix();
        this.transform1(
          this.objects[this.objects.length - 1],
          this.targets[this.currentTarget][
            this.targets[this.currentTarget].length - 1
          ],
          2000
        );
        /* this.setSphereStyle([{ src: this.imageUrl }]);
        this.setHelixStyle([{ src: this.imageUrl }]);
        this.setGridStyle([{ src: this.imageUrl }]);
         */
        //this.transform(this.targets[this.currentTarget], 2000);
        this.animate();
        this.render();
      },
    },
  },
  mounted() {
    this.init();
    this.animate();
    /*  setInterval(() => {
      if (this.objects.length < 100) this.addOnePerson();
    }, 5000); */
  },
  methods: {
    addOnePerson() {
      this.table.push({ src: this.imageUrl });
    },
    setOneElement(object) {
      const element = document.createElement("div");
      element.className = "element";
      element.style.backgroundImage = "url(" + object.imgurl + ")";
      const objectCSS = new CSS3DObject(element);
      objectCSS.position.x = Math.random() * 4000 - 2000;
      objectCSS.position.y = Math.random() * 4000 - 2000;
      objectCSS.position.z = Math.random() * 4000 - 2000;
      this.scene.add(objectCSS);
      this.objects.push(objectCSS);
    },
    setElementList(table) {
      for (let i = 0; i < table.length; i++) {
        const element = document.createElement("div");
        element.className = "element";
        element.style.backgroundImage = "url(" + table[i].src + ")";
        const objectCSS = new CSS3DObject(element);
        objectCSS.position.x = Math.random() * 4000 - 2000;
        objectCSS.position.y = Math.random() * 4000 - 2000;
        objectCSS.position.z = Math.random() * 4000 - 2000;

        //this.transform1(objectCSS, 2000);
        this.scene.add(objectCSS);
        this.objects.push(objectCSS);
      }
    },
    addOneTable() {
      //this.transform1(objectCSS, 2000, 0);
      const object = new THREE.Object3D();
      object.position.x = (((this.table.length - 1) % 10) - 5) * 200;
      object.position.y = (5 - parseInt((this.table.length - 1) / 10)) * 200;
      object.position.z = 0;
      this.targets.table.push(object);
      //this.transform1(this.objects[this.objects.length - 1], object, 2000);

      /* for (let i = 0; i < table.length; i++) {
        const object = new THREE.Object3D();
        if (table.length == 1) {
          object.position.x = ((this.table.length % 10) - 5) * 200;
          object.position.y = (5 - parseInt(this.table.length / 10)) * 200;
        } else {
          object.position.x = ((i % 10) - 5) * 200;
          object.position.y = (5 - parseInt(i / 10)) * 200;
        }

        //object.position.y = 800;

        this.targets.table.push(object);
      } */
    },
    addOneSphere() {
      const vector = new THREE.Vector3();

      //for (let i = 0, l = this.objects.length; i < l; i++) {
      const phi = Math.acos(-1 + (2 * ((this.objects.length - 1) % 100)) / 100);
      const theta = Math.sqrt(100 * Math.PI) * phi;

      const object = new THREE.Object3D();

      object.position.setFromSphericalCoords(800, phi, theta);

      vector.copy(object.position).multiplyScalar(2);

      object.lookAt(vector);

      this.targets.sphere.push(object);
      //this.transform1(this.objects[this.objects.length - 1], object, 2000);
      //}
    },
    addOneGrid() {
      //for (let i = 0; i < this.objects.length; i++) {
      const object = new THREE.Object3D();

      object.position.x = ((this.objects.length - 1) % 5) * 400 - 800;
      object.position.y =
        -(Math.floor((this.objects.length - 1) / 5) % 5) * 400 + 800;
      object.position.z =
        Math.floor((this.objects.length - 1) / 25) * 1000 - 2000;

      this.targets.grid.push(object);
      //this.transform1(this.objects[this.objects.length - 1], object, 2000);
      //}
    },
    addOneHelix() {
      const vector = new THREE.Vector3();
      //for (let i = 0, l = this.objects.length; i < l; i++) {
      const theta = (this.objects.length - 1) * 0.175 + Math.PI;
      const y = -((this.objects.length - 1) * 8) + 450;

      const object = new THREE.Object3D();

      object.position.setFromCylindricalCoords(900, theta, y);

      vector.x = object.position.x * 2;
      vector.y = object.position.y;
      vector.z = object.position.z * 2;

      object.lookAt(vector);

      this.targets.helix.push(object);
      //}
    },
    setSphereStyle(objects) {
      const vector = new THREE.Vector3();

      for (let i = 0, l = this.objects.length; i < l; i++) {
        const phi = Math.acos(-1 + (2 * i) / l);
        const theta = Math.sqrt(l * Math.PI) * phi;

        const object = new THREE.Object3D();

        object.position.setFromSphericalCoords(800, phi, theta);

        vector.copy(object.position).multiplyScalar(2);

        object.lookAt(vector);

        this.targets.sphere.push(object);
      }
    },
    setHelixStyle(table) {
      const vector = new THREE.Vector3();
      for (let i = 0, l = this.objects.length; i < l; i++) {
        const theta = i * 0.175 + Math.PI;
        const y = -(i * 8) + 450;

        const object = new THREE.Object3D();

        object.position.setFromCylindricalCoords(900, theta, y);

        vector.x = object.position.x * 2;
        vector.y = object.position.y;
        vector.z = object.position.z * 2;

        object.lookAt(vector);

        this.targets.helix.push(object);
      }
    },

    setGridStyle(table) {
      for (let i = 0; i < this.objects.length; i++) {
        const object = new THREE.Object3D();

        object.position.x = (i % 5) * 400 - 800;
        object.position.y = -(Math.floor(i / 5) % 5) * 400 + 800;
        object.position.z = Math.floor(i / 25) * 1000 - 2000;

        this.targets.grid.push(object);
      }
    },
    setAddEventListener() {
      this.controls = new TrackballControls(
        this.camera,
        this.renderer.domElement
      );
      this.controls.minDistance = 500;
      this.controls.maxDistance = 6000;
      this.controls.addEventListener("change", this.render);

      const buttonTable = document.getElementById("table");
      buttonTable.addEventListener("click", () => {
        this.currentTarget = "table";
        this.transform(this.targets.table, 2000);
      });

      const buttonSphere = document.getElementById("sphere");
      buttonSphere.addEventListener("click", () => {
        this.currentTarget = "sphere";
        this.transform(this.targets.sphere, 2000);
      });

      const buttonHelix = document.getElementById("helix");
      buttonHelix.addEventListener("click", () => {
        this.currentTarget = "helix";
        this.transform(this.targets.helix, 2000);
      });

      const buttonGrid = document.getElementById("grid");
      buttonGrid.addEventListener("click", () => {
        this.currentTarget = "grid";
        this.transform(this.targets.grid, 2000);
      });
    },
    init() {
      this.camera = new THREE.PerspectiveCamera(
        40,
        window.innerWidth / window.innerHeight,
        1,
        10000
      );
      this.camera.position.z = 3000;
      this.scene = new THREE.Scene();
      //设置元素
      /*  this.setElementList(this.table);
      this.addOneTable(this.table);
      this.setSphereStyle();
      this.setHelixStyle();
      this.setGridStyle(); */
      this.renderer = new CSS3DRenderer();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      document
        .getElementById("container")
        .appendChild(this.renderer.domElement);
      this.setAddEventListener();
      //this.transform(this.targets[this.currentTarget], 2000);
      window.addEventListener("resize", this.onWindowResize);
    },
    transform(targets, duration) {
      TWEEN.removeAll();
      for (let i = 0; i < this.objects.length; i++) {
        const object = this.objects[i];
        const target = targets[i];

        new TWEEN.Tween(object.position)
          .to(
            {
              x: target.position.x,
              y: target.position.y,
              z: target.position.z,
            },
            Math.random() * duration + duration
          )
          .easing(TWEEN.Easing.Exponential.InOut)
          .start();

        new TWEEN.Tween(object.rotation)
          .to(
            {
              x: target.rotation.x,
              y: target.rotation.y,
              z: target.rotation.z,
            },
            Math.random() * duration + duration
          )
          .easing(TWEEN.Easing.Exponential.InOut)
          .start();
      }

      new TWEEN.Tween(this)
        .to({}, duration * 2)
        .onUpdate(this.render)
        .start();
    },
    transform1(object, target, duration) {
      //TWEEN.removeAll();
      const element = document.createElement("div");
      element.innerText =
        target.position.x + "-" + target.position.y + "-" + target.position.y;
      object.element.appendChild(element);
      new TWEEN.Tween(object.position)
        .to(
          {
            x: 0,
            y: 0,
            z: 2000,
          },
          2000
        )
        .easing(TWEEN.Easing.Exponential.InOut)
        .chain(
          new TWEEN.Tween(object.position)
            .to(
              {
                x: target.position.x,
                y: target.position.y,
                z: target.position.z,
              },
              2000
            )
            .easing(TWEEN.Easing.Exponential.InOut)
            .chain(
              new TWEEN.Tween(object.rotation)
                .to(
                  {
                    x: target.rotation.x,
                    y: target.rotation.y,
                    z: target.rotation.z,
                  },
                  Math.random() * duration + duration
                )
                .easing(TWEEN.Easing.Exponential.InOut)
                .start()
            )
            .start()
        )
        .start();

      new TWEEN.Tween(this)
        .to({}, duration * 2)
        .onUpdate(this.render)
        .start();
    },

    onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(window.innerWidth, window.innerHeight);

      this.render();
    },

    animate() {
      requestAnimationFrame(this.animate);

      TWEEN.update();

      this.controls.update();
    },

    render() {
      this.renderer.render(this.scene, this.camera);
    },
  },

  //获得指定文件夹图片名称列表，同时设置图片的位置
};
</script>
<style lang="css" scoped>
.main {
  width: 100%;
  height: 100%;
  margin: 0;
  background-image: url("../assets/bg.jpeg");
  background-size: contain;
  color: #fff;
  font-family: Monospace;
  font-size: 13px;
  line-height: 24px;
  overscroll-behavior: none;
  position: relative;
}
#container {
  width: 100%;
  height: 100%;
}

a {
  color: #ff0;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

button {
  cursor: pointer;
  text-transform: uppercase;
}

#info {
  position: absolute;
  top: 0px;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  text-align: center;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  pointer-events: none;
  z-index: 1; /* TODO Solve this in HTML */
}

a,
button,
input,
select {
  pointer-events: auto;
}

.dg.ac {
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  z-index: 2 !important; /* TODO Solve this in HTML */
}

#overlay {
  position: absolute;
  font-size: 16px;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.7);
}

#overlay button {
  background: transparent;
  border: 0;
  border: 1px solid rgb(255, 255, 255);
  border-radius: 4px;
  color: #ffffff;
  padding: 12px 18px;
  text-transform: uppercase;
  cursor: pointer;
}

#notSupported {
  width: 50%;
  margin: auto;
  background-color: #f00;
  margin-top: 20px;
  padding: 10px;
}
a {
  color: #8ff;
}

#menu {
  position: absolute;
  bottom: 20px;
  width: 100%;
  text-align: center;
}
.qrcode {
  width: 200px;
  height: 300px;
  position: absolute;
  right: 0;
  bottom: 0;
}
.qrcode img {
  width: 200px;
  height: 200px;
}
.element {
  width: 120px;
  height: 160px;
  box-shadow: 0px 0px 12px rgba(0, 255, 255, 0.5);
  border: 1px solid rgba(127, 255, 255, 0.25);
  font-family: Helvetica, sans-serif;
  text-align: center;
  line-height: normal;
  cursor: default;
}

.element:hover {
  box-shadow: 0px 0px 12px rgba(0, 255, 255, 0.75);
  border: 1px solid rgba(127, 255, 255, 0.75);
}

.element .number {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 12px;
  color: rgba(127, 255, 255, 0.75);
}

button {
  color: rgba(127, 255, 255, 0.75);
  background: transparent;
  outline: 1px solid rgba(127, 255, 255, 0.75);
  border: 0px;
  padding: 5px 10px;
  cursor: pointer;
}

button:hover {
  background-color: rgba(0, 255, 255, 0.5);
}

button:active {
  color: #000000;
  background-color: rgba(0, 255, 255, 0.75);
}
</style>
