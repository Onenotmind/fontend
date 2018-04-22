import testDogEar from '../../images/petbaidu/ear.png'
import testDogBody from '../../images/petbaidu/body.png'
import testDogEye from '../../images/petbaidu/eye.png'
// import CanvasImgTypesArr from './CanvasImgTypes.js'
// const fs = require('fs')
// const psth = require('path')


class BaseCanvas {
	constructor (divid) {
		this.canvasDiv = document.getElementById(divid)
		this.ctx = this.canvasDiv.getContext('2d')
		this.width = 200
		this.height = 200
		this.canvasDiv.onclick = (e) => {
			console.log('onclick')
      this.downEvent(e)
    }
	}

	convertImageToCanvas (image, left, top) {
		this.ctx.drawImage(image, left, top)
	}

	downEvent (e) {
		console.log('e', e)
	}

	convertCharactor (imageSrc) {
		let image = new window.Image()
		image.src = imageSrc
		return new Promise((resolve, reject) => {
			image.onload = function () {
				console.log(image)
				resolve(image)
			}
		})
	}

	drawCharactorPart (imageSrc, left, top) {
		return new Promise((resolve, reject) => {
			this.convertCharactor(imageSrc)
			.then((image) => {
				this.convertImageToCanvas(image, left, top)
				resolve()
			})
			.catch(e => {
				reject(e)
			})
		})
	}

	async drawCharactor (CanvasImgTypesArr) {
		for (let part of CanvasImgTypesArr) {
			const draw = await this.drawCharactorPart(part, 0, 0)
		}
		// await this.drawCharactorPart(testDogEar, -10,60)
		// await this.drawCharactorPart(testDogBody, 0, 0)
		// await this.drawCharactorPart(testDogEye, 5, 0)
	}

	convertCanvasToImageData (canvas) {
		return canvas.toDataURL("image/png")
	}

	getCanvasData () {
		return this.ctx
	}

	clearCanvas () {
		this.ctx.clearRect(0, 0, this.width, this.height)
	}

	// savePng (data, name, cb, errcb) { // 将截图数据存为图片
 //    let dirPath = path.resolve('./', './双师未来黑板')
 //    let exist = fs.existsSync(dirPath)
 //    if (!exist) {
 //      fs.mkdirSync(dirPath)
 //    }
 //    let imagePath = path.resolve(dirPath, './' + name + '.png')
 //    let dataBuffer = data.toPng()
 //    fs.writeFile(imagePath, dataBuffer, function (err) {
 //      if (err) {
 //        if (errcb) {
 //          errcb(err)
 //        }
 //      } else {
 //        if (cb) {
 //          cb(imagePath)
 //        }
 //      }
 //    })
 //  }
}

export default BaseCanvas