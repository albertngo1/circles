const Util = {



  randomVec(length, vecMultiplier = 1) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg) * vecMultiplier, Math.cos(deg) * vecMultiplier], length);
  },

  scale(vec, m) {
    return [vec[0] * m, vec[1] * m]
  }



}




module.exports = Util;
