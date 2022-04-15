document.addEventListener("DOMContentLoaded",()=>{

  //add images to the dom
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
  fetch(imgUrl)
  .then((res) =>res.json())
  .then((data) => renderImage(data))

  function renderImage(data){
    data.message.forEach(element => {
      let img = document.createElement("img")
      img.src = element
      document.querySelector("div#dog-image-container").appendChild(img)
    });
  }

  //list breed names in the dom
  let ul = document.querySelector("#dog-breeds")
  let breeds = new Array()
  const breedUrl = 'https://dog.ceo/api/breeds/list/all'
  fetch(breedUrl)
  .then((res) =>res.json())
  .then((data) => {
    breeds = Object.keys(data.message)
    addBreed(breeds)
    updateBreedBySelect()
  })

  function addBreed(breedList){
    breedList.forEach((breed)=>{
      let li = document.createElement("li")
      li.innerText = breed
      ul.appendChild(li)
      li.addEventListener("click",(event)=>{
        event.target.style.color = "green"
      })
    })

  }
  function updateBreedBySelect(){
    let dropDown =document.querySelector("#breed-dropdown") 
    dropDown.addEventListener("change",()=>{
      deleteChild()
      let selectValue = dropDown.value
      const selectedBreeds = breeds.filter((breed)=>{
        return breed.startsWith(selectValue)
      })
      addBreed(selectedBreeds)
    })
  }

  function deleteChild() {
    let child = ul.lastElementChild; 
    while (child) {
        ul.removeChild(child);
        child = ul.lastElementChild;
    }
  }
})

