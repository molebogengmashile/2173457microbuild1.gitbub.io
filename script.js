document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('.score span')
    const storageDisplay = document.querySelector('.storage span')
    const startBtn = document.querySelector('.start')
    const storeBtn = document.querySelector('.offloadScore')
  
    const width = 10
    //the apples on the grid
    let currentIndex = 0 
    let appleIndex = 0 
    let BadappleIndex = 0 
    //snake body index
    let currentSnake = [2,1,0] 
    let direction = 1
    let score = 0

    let storageScore = 0
    let speed = 0.9
    let intervalTime = 0
    let interval = 0
    let isPaused = false
  
  
    //restart level
    function startGame() {
      currentSnake.forEach(index => squares[index].classList.remove('snake'))
      squares[appleIndex].classList.remove('apple')
      squares[BadappleIndex].classList.remove('badApple')
      clearInterval(interval)
      score = 0
      randomApple()
      
      randomBadApple()
      direction = 1
      scoreDisplay.innerText = score
      storageDisplay.innerText = storageScore
      intervalTime = 1000
      //the snake parts
      currentSnake = [2,1,0]
      currentIndex = 0
      currentSnake.forEach(index => squares[index].classList.add('snake'))
      interval = setInterval(moveOutcomes, intervalTime)
    }
  
  
    //moving the snake 
    function moveOutcomes() {
  
    
      if (
          //bottom wall
        (currentSnake[0] + width >= (width * width) && direction === width ) || 
        //top wall
        (currentSnake[0] - width < 0 && direction === -width) ||  
        //right wall
        (currentSnake[0] % width === width -1 && direction === 1) || 
        //left wall
        (currentSnake[0] % width === 0 && direction === -1) || 
      //body collisions
        squares[currentSnake[0] + direction].classList.contains('snake') 
      ) {
        return clearInterval(interval)
      }
  
      const tail = currentSnake.pop() 
      squares[tail].classList.remove('snake')  
      currentSnake.unshift(currentSnake[0] + direction) 
  
      //apples
      if(squares[currentSnake[0]].classList.contains('apple')) {
        squares[currentSnake[0]].classList.remove('apple')
        squares[tail].classList.add('snake')
        currentSnake.push(tail)
        randomApple()
        score++
        scoreDisplay.textContent = score
        clearInterval(interval)
        intervalTime = intervalTime * speed
        interval = setInterval(moveOutcomes, intervalTime)
      }

       // getting bad apple
       if(squares[currentSnake[0]].classList.contains('badApple')) {
        squares[currentSnake[0]].classList.remove('badApple')
        squares[tail].classList.remove('snake')
        currentSnake.pop(tail)
        randomBadApple()
        score = score+ 2
        scoreDisplay.textContent = score
        clearInterval(interval)
        intervalTime = intervalTime * speed
        interval = setInterval(moveOutcomes, intervalTime)
      }
     
      squares[currentSnake[0]].classList.add('snake')
    }

    
  
  
    //new apples
    function randomApple() {
      do{
        appleIndex = Math.floor(Math.random() * squares.length)
      } while(squares[appleIndex].classList.contains('snake')) 
      squares[appleIndex].classList.add('apple')
    }

    
    //new bad apples
    function randomBadApple() {
        do{
          appleIndex = Math.floor(Math.random() * squares.length)
        } while(squares[appleIndex].classList.contains('snake')) 
        squares[appleIndex].classList.add('badApple')
      }
  
  
    //arrow keys
    function control(e) {
      squares[currentIndex].classList.remove('snake')
  
      if(e.keyCode === 39) {
        direction = 1 //right arrow
      } else if (e.keyCode === 38) {
        direction = -width //up arrow
      } else if (e.keyCode === 37) {
        direction = -1 // left arrow
      } else if (e.keyCode === 40) {
        direction = +width //down arrow
      }
    }

    function storeApples(){
      if(score <= 10){
          
          storageScore++

          score = score - 10

      }
      else if (score > 10){
          storageScore = storageScore//store function not working properly
          score = score 
      }

      
      storageDisplay.innerText = storageScore
    }
  
    document.addEventListener('keyup', control)
    startBtn.addEventListener('click', startGame)
    storeBtn.addEventListener('click', storeApples)
  })