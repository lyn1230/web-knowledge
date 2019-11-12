onLoad: function () {
    const camera = wx.createCameraContext(this);
    let count = 0;
    const listener = camera.onCameraFrame((frame) => {
      count++;                                                  //设置计数器，防止帧截取速度太快导致系统卡机，这里是每四次打印一次
      if(count === 4) {
        console.log(frame);
        count = 0;
      }        
    })
    listener.start();
}