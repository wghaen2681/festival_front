<template lang="pug">
#test
  #test_box
    #o1
    #o2
</template>

#test
  height: 100vh
  display: flex
  justify-content: center
  align-items: center

#test_box
  width: 40vw
  height: 40vw
  background: green
  display: flex
  justify-content: center
  align-items: center

  #o1
    width: 50px
    height: 50px
    background: blue

  #o2
    width: 50px
    height: 50px
    background: red

  @media (max-width: 500px)
    #o1
      width: 20px
      height: 20px
      background: blue

    #o2
      width: 20px
      height: 20px
      background: red
