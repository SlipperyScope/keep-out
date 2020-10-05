const translateToScreen = (xCord,yCord) => {
 return {x: xCord * 100 + 50, y: yCord * 100 + 100}
}

export default translateToScreen;