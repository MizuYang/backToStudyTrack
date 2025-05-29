<script lang="ts" setup>
// All images and information about the Pokémon were taken from the official Pokédex: https://www.pokemon.com/us/pokedex/
const { gsap } = useGsap()

onMounted(() => {
  const containerAll = [...document.querySelectorAll('.container')]

  containerAll.forEach((container) => {
    const info = container.querySelector('.information')
    gsap.set(info, { yPercent: 100 })
    const silhouette = container.querySelector('.silhouette .cover')
    console.log('info: ', info)
    console.log('silhouette: ', silhouette)
    const tl = gsap.timeline({ paused: true })

    tl.to(info, { yPercent: 0 })
    tl.to(silhouette, { opacity: 0 }, 0)

    console.log('container: ', container)

    container.addEventListener('mouseenter', () => tl.timeScale(1).play())
    container.addEventListener('mouseleave', () => tl.timeScale(3).reverse())
  })
})
</script>

<template>
  <main class="mx-auto">
    <a
      href="https://codepen.io/GreenSock/pen/PoqRZOB"
      class="mx-auto inline-block text-blue-400 hover:text-blue-400/80"
      target="_blank"
    >官方的 demo codePen</a>
    <div class="mx-auto">
      <div class="container">
        <div id="Bulbasaur" class="silhouette">
          <div class="cover" />
        </div>
        <div class="card">
          <h1>Who's</h1>
          <div id="BulbasaurInfo" class="information">
            <h2 id="BulbasaurName">
              Bulbasaur
            </h2>
            <p>
              Bulbasaur can be seen napping in bright sunlight. There is a seed
              on its back. By soaking up the sun's rays, the seed grows
              progressively larger.
            </p>
            <p class="type">
              Type: <button id="grass">
                Grass
              </button>
              <button id="poison">
                Poison
              </button>
            </p>
          </div>
        </div>
      </div>
      <div class="container">
        <div id="Charmander" class="silhouette">
          <div class="cover" />
        </div>
        <div class="card">
          <h1>That</h1>
          <div id="CharmanderInfo" class="information">
            <h2 id="CharmanderName">
              Charmander
            </h2>
            <p>
              The flame that burns at the tip of its tail is an indication of
              its emotions. The flame wavers when Charmander is enjoying itself.
              If the Pokémon becomes enraged, the flame burns fiercely.
            </p>
            <p class="type">
              Type: <button id="fire">
                Fire
              </button>
            </p>
          </div>
        </div>
      </div>
      <div class="container">
        <div id="Squirtle" class="silhouette">
          <div class="cover" />
        </div>
        <div class="card">
          <h1>Pokémon?</h1>
          <div id="SquirtleInfo" class="information">
            <h2 id="SquirtleName">
              Squirtle
            </h2>
            <p>
              Squirtle's shell is not merely used for protection. The shell's
              rounded shape and the grooves on its surface help minimize
              resistance in water, enabling this Pokémon to swim at high speeds.
            </p>
            <p class="type">
              Type: <button id="water">
                Water
              </button>
            </p>
          </div>
        </div>
      </div>
      <div class="instructions">
        Hover over a card to find out!
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Bebas+Neue|Ubuntu|Raleway&display=swap");

* {
  box-sizing: border-box;
}

body {
  height: 100vh;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  background-color: #e5e5e5;
  font-family: ubuntu;
}

.container {
  width: 20%;
  min-width: 200px;
  max-width: 250px;
  height: 450px;
  float: left;
  margin: 0 10px;
}
.silhouette {
  position: relative;
  width: 100px;
  height: 100px;
  background-size: cover;
  margin: auto;
}
.silhouette .cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
}

.type {
  text-align: justify;
}

.card {
  background-color: white;
  height: calc(100% - 150px);
  align-self: center;
  border-radius: 10px;
  text-align: center;
  padding-top: 40%;
  box-shadow: 0px 0px 12px -1px black;
  margin: auto;
  overflow: hidden;
  position: relative;
}

h1 {
  font-family: Bebas Neue;
  letter-spacing: 2px;
  font-size: 30pt;
}

#Bulbasaur {
  background-image: url(https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png);
}
#Bulbasaur .cover {
  background-image: url(https://assets.codepen.io/16327/001-silhouette.png);
}

#Charmander {
  background-image: url(https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png);
}
#Charmander .cover {
  background-image: url(https://assets.codepen.io/16327/004-silhouette.png);
}

#Squirtle {
  background-image: url(https://assets.pokemon.com/assets/cms2/img/pokedex/detail/007.png);
}
#Squirtle .cover {
  background-image: url(https://assets.codepen.io/16327/007-silhouette.png);
}

.information {
  background-color: white;
  height: 100%;
  border-radius: 10px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  margin: auto;
  text-align: center;
}

#BulbasaurInfo {
  border-top: 10px solid #9dcb58;
  border-bottom: 10px solid #9dcb58;
}

#CharmanderInfo {
  border-top: 10px solid #fb7d34;
  border-bottom: 10px solid #fb7d34;
}

#SquirtleInfo {
  border-top: 10px solid #4993c2;
  border-bottom: 10px solid #4993c2;
}

h2 {
  text-align: center;
  padding-bottom: 10px;
}

#BulbasaurName {
  border-bottom: dashed 2px #9dcb58;
}

#CharmanderName {
  border-bottom: dashed 2px #fb7d34;
}

#SquirtleName {
  border-bottom: dashed 2px #4993c2;
}

p {
  padding-left: 10px;
  padding-right: 10px;
  font-family: raleway;
  font-size: 10pt;
}

button {
  width: 60px;
  height: auto;
  border: none;
  color: white;
  border-radius: 10px;
  font-size: 10pt;
}

#grass {
  background-color: #9dcb58;
}

#poison {
  background-color: #b881c8;
}

#fire {
  background-color: #fb7d34;
}

#water {
  background-color: #4993c2;
}

.instructions {
  width: 100%;
  text-align: center;
  font-size: 20pt;
  color: grey;
}
</style>
