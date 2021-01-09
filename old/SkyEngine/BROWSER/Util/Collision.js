SkyEngine('Util').Collision = OBJECT({

	init : (inner, self) => {
		
		let checkBetween = (
			point,
			start, end
		) => {
			return (start - point) * (end - point) <= 0;
		};
		
		let checkPointInRect = self.checkPointInRect = (
			pointX, pointY,
			
			rectX, rectY,
			rectWidth, rectHeight,
			rectScaleX, rectScaleY,
			rectSin, rectCos
		) => {
			
			pointX -= rectX;
			pointY -= rectY;
			
			let tempX = rectX + rectCos * pointX + rectSin * pointY;
			let tempY = rectY - rectSin * pointX + rectCos * pointY;
			
			rectWidth *= rectScaleX;
			rectHeight *= rectScaleY;
			
			rectX -= rectWidth / 2;
			rectY -= rectHeight / 2;
			
			return checkBetween(tempX, rectX, rectX + rectWidth) === true && checkBetween(tempY, rectY, rectY + rectHeight) === true;
		};
		
		let checkPointInCircle = self.checkPointInCircle = (
			pointX, pointY,
			
			circleX, circleY,
			circleWidth, circleHeight,
			circleScaleX, circleScaleY,
			circleSin, circleCos
		) => {
			
			pointX -= circleX;
			pointY -= circleY;
			
			circleWidth *= circleScaleX;
			circleHeight *= circleScaleY;

			let tempX = 2 * (circleCos * pointX + circleSin * pointY) / circleWidth;
			let tempY = 2 * (circleSin * pointX - circleCos * pointY) / circleHeight;
			
			return tempX * tempX + tempY * tempY <= 1;
		};
		
		let checkPointInPolygon = self.checkPointInPolygon = (
			pointX, pointY,
			
			polygonX, polygonY,
			polygonPoints,
			polygonScaleX, polygonScaleY,
			polygonSin, polygonCos
		) => {
			
			pointX -= polygonX;
			pointY -= polygonY;
			
			let tempX = polygonX + polygonCos * pointX + polygonSin * pointY;
			let tempY = polygonY - polygonSin * pointX + polygonCos * pointY;
			
			tempX -= polygonX;
			tempY -= polygonY;
			
			let result = false;
			
			let length = polygonPoints.length;
			
			for (let i = 0, j = length - 1; i < length; j = i, i += 1) {
				
				let iX = polygonPoints[i].x * polygonScaleX;
				let iY = polygonPoints[i].y * polygonScaleY;
				
				let jX = polygonPoints[j].x * polygonScaleX;
				let jY = polygonPoints[j].y * polygonScaleY;
				
				if ((iY > tempY) !== (jY > tempY) && tempX < (jX - iX) * (tempY - iY) / (jY - iY) + iX) {
					result = !result;
				}
			}
			
			return result;
		};
		
		let checkLineLine = self.checkLineLine = (
			aX, aY,
			aStartX, aStartY,
			aEndX, aEndY,
			aScaleX, aScaleY,
			aSin, aCos,
			
			bX, bY,
			bStartX, bStartY,
			bEndX, bEndY,
			bScaleX, bScaleY,
			bSin, bCos
		) => {
			
			aStartX *= aScaleX;
			aStartY *= aScaleY;
			
			let aTempStartX = aX + aCos * aStartX + aSin * aStartY;
			let aTempStartY = aY + aSin * aStartX + aCos * aStartY;
				
			aEndX *= aScaleX;
			aEndY *= aScaleY;
			
			let aTempEndX = aX + aCos * aEndX + aSin * aEndY;
			let aTempEndY = aY + aSin * aEndX + aCos * aEndY;
			
			bStartX *= bScaleX;
			bStartY *= bScaleY;
			
			let bTempStartX = bX + bCos * bStartX + bSin * bStartY;
			let bTempStartY = bY + bSin * bStartX + bCos * bStartY;
			
			bEndX *= bScaleX;
			bEndY *= bScaleY;
			
			let bTempEndX = bX + bCos * bEndX + bSin * bEndY;
			let bTempEndY = bY + bSin * bEndX + bCos * bEndY;
			
			let denom = (aTempEndX - aTempStartX) * (bTempEndY - bTempStartY) - (bTempEndX - bTempStartX) * (aTempEndY - aTempStartY);
			
			if (denom === 0) {
				return false;
			}
			
			else {
				
				let ua = ((bTempEndY - bTempStartY) * (bTempEndX - aTempStartX) + (bTempStartX - bTempEndX) * (bTempEndY - aTempStartY)) / denom;
				let ub = ((aTempStartY - aTempEndY) * (bTempEndX - aTempStartX) + (aTempEndX - aTempStartX) * (bTempEndY - aTempStartY)) / denom;
				
				return 0 <= ua && ua <= 1 && 0 <= ub && ub <= 1;
			}
		};
		
		let checkLineRect = self.checkLineRect = (
			lineX, lineY,
			lineStartX, lineStartY,
			lineEndX, lineEndY,
			lineScaleX, lineScaleY,
			lineSin, lineCos,
			
			rectX, rectY,
			rectWidth, rectHeight,
			rectScaleX, rectScaleY,
			rectSin, rectCos
		) => {
			
			lineStartX *= lineScaleX;
			lineStartY *= lineScaleY;
			
			let lineTempStartX = lineX + lineCos * lineStartX + lineSin * lineStartY;
			let lineTempStartY = lineY + lineSin * lineStartX + lineCos * lineStartY;
			
			if (checkPointInRect(
			lineTempStartX, lineTempStartY,
			
			rectX, rectY,
			rectWidth, rectHeight,
			rectScaleX, rectScaleY,
			rectSin, rectCos) === true) {
				return true;
			}
			
			lineEndX *= lineScaleX;
			lineEndY *= lineScaleY;
			
			let lineTempEndX = lineX + lineCos * lineEndX + lineSin * lineEndY;
			let lineTempEndY = lineY + lineSin * lineEndX + lineCos * lineEndY;
			
			if (checkPointInRect(
			lineTempEndX, lineTempEndY,
			
			rectX, rectY,
			rectWidth, rectHeight,
			rectScaleX, rectScaleY,
			rectSin, rectCos) === true) {
				return true;
			}
			
			let rectPoint1X, rectPoint1Y;
			let rectPoint2X, rectPoint2Y;
			let rectPoint3X, rectPoint3Y;
			let rectPoint4X, rectPoint4Y;
			
			rectWidth *= rectScaleX / 2;
			rectHeight *= rectScaleY / 2;
			
			let cw = rectCos * rectWidth;	let ch = rectCos * rectHeight;
			let sw = -rectSin * rectWidth;	let sh = -rectSin * rectHeight;
			
			rectPoint1X = rectX - cw - sh;	rectPoint1Y = rectY + sw - ch;
			rectPoint2X = rectX + cw - sh;	rectPoint2Y = rectY - sw - ch;
			rectPoint3X = rectX + cw + sh;	rectPoint3Y = rectY - sw + ch;
			rectPoint4X = rectX - cw + sh;	rectPoint4Y = rectY + sw + ch;
			
			return checkLineLine(0, 0, lineTempStartX, lineTempStartY, lineTempEndX, lineTempEndY, 1, 1, 0, 1, 0, 0, rectPoint1X, rectPoint1Y, rectPoint2X, rectPoint2Y, 1, 1, 0, 1) === true ||
				checkLineLine(0, 0, lineTempStartX, lineTempStartY, lineTempEndX, lineTempEndY, 1, 1, 0, 1, 0, 0, rectPoint2X, rectPoint2Y, rectPoint3X, rectPoint3Y, 1, 1, 0, 1) === true ||
				checkLineLine(0, 0, lineTempStartX, lineTempStartY, lineTempEndX, lineTempEndY, 1, 1, 0, 1, 0, 0, rectPoint3X, rectPoint3Y, rectPoint4X, rectPoint4Y, 1, 1, 0, 1) === true ||
				checkLineLine(0, 0, lineTempStartX, lineTempStartY, lineTempEndX, lineTempEndY, 1, 1, 0, 1, 0, 0, rectPoint4X, rectPoint4Y, rectPoint1X, rectPoint1Y, 1, 1, 0, 1) === true;
		};
		
		let checkLineCircle = self.checkLineCircle = (
			lineX, lineY,
			lineStartX, lineStartY,
			lineEndX, lineEndY,
			lineScaleX, lineScaleY,
			lineSin, lineCos,
			
			circleX, circleY,
			circleWidth, circleHeight,
			circleScaleX, circleScaleY,
			circleSin, circleCos
		) => {
			
			lineStartX *= lineScaleX;
			lineStartY *= lineScaleY;
			
			let lineTempStartX = lineX + lineCos * lineStartX + lineSin * lineStartY;
			let lineTempStartY = lineY + lineSin * lineStartX + lineCos * lineStartY;
			
			if (checkPointInCircle(
			lineTempStartX, lineTempStartY,
			
			circleX, circleY,
			circleWidth, circleHeight,
			circleScaleX, circleScaleY,
			circleSin, circleCos) === true) {
				return true;
			}
			
			lineEndX *= lineScaleX;
			lineEndY *= lineScaleY;
			
			let lineTempEndX = lineX + lineCos * lineEndX + lineSin * lineEndY;
			let lineTempEndY = lineY + lineSin * lineEndX + lineCos * lineEndY;
			
			if (checkPointInCircle(
			lineTempEndX, lineTempEndY,
			
			circleX, circleY,
			circleWidth, circleHeight,
			circleScaleX, circleScaleY,
			circleSin, circleCos) === true) {
				return true;
			}
			
			lineTempStartX -= circleX;
			lineTempStartY -= circleY;
			
			lineTempEndX -= circleX;
			lineTempEndY -= circleY;
			
			let tempStartX = circleCos * lineTempStartX + circleSin * lineTempStartY;
			let tempStartY = -circleSin * lineTempStartX + circleCos * lineTempStartY;
			
			let tempEndX = circleCos * lineTempEndX + circleSin * lineTempEndY;
			let tempEndY = -circleSin * lineTempEndX + circleCos * lineTempEndY;
			
			circleWidth *= circleScaleX;
			circleHeight *= circleScaleY;
			
			let m = (tempEndY - tempStartY) / (tempEndX - tempStartX);
			
			if (Math.abs(m) > 1024) {
				return checkLineCircle(0, 0, tempStartY, tempStartX, tempEndY, tempEndX, 1, 1, 0, 1, 0, 0, circleHeight, circleWidth, 1, 1, 0, 1);
			}
			
			if (checkPointInCircle(tempEndX, tempEndY, 0, 0, circleWidth, circleHeight, 1, 1, 0, 1) === true) {
				return true;
			}
			
			let s = circleWidth * circleWidth / 4;
			let t = circleHeight * circleHeight / 4;
			
			let k = tempStartY - (m * tempStartX);
			
			let a = 1 / s + m * m / t;
			let b = 2 * m * k / t;
			let c = k * k / t - 1;
			
			let discrim = b * b - 4 * a * c;
			
			if (discrim < 0) {
				return false;
			}
			
			discrim = Math.sqrt(discrim);
			a *= 2;
			
			return checkBetween((-b - discrim) / a, tempStartX, tempEndX) === true || checkBetween((-b + discrim) / a, tempStartX, tempEndX) === true;
		};
		
		let checkLinePolygon = self.checkLinePolygon = (
			lineX, lineY,
			lineStartX, lineStartY,
			lineEndX, lineEndY,
			lineScaleX, lineScaleY,
			lineSin, lineCos,
			
			polygonX, polygonY,
			polygonPoints,
			polygonScaleX, polygonScaleY,
			polygonSin, polygonCos
		) => {
			
			lineStartX *= lineScaleX;
			lineStartY *= lineScaleY;
			
			let lineTempStartX = lineX + lineCos * lineStartX + lineSin * lineStartY;
			let lineTempStartY = lineY + lineSin * lineStartX + lineCos * lineStartY;
			
			if (checkPointInPolygon(
			lineTempStartX, lineTempStartY,
			
			polygonX, polygonY,
			polygonPoints,
			polygonScaleX, polygonScaleY,
			polygonSin, polygonCos) === true) {
				return true;
			}
				
			lineEndX *= lineScaleX;
			lineEndY *= lineScaleY;
			
			let lineTempEndX = lineX + lineCos * lineEndX + lineSin * lineEndY;
			let lineTempEndY = lineY + lineSin * lineEndX + lineCos * lineEndY;
			
			if (checkPointInPolygon(
			lineTempEndX, lineTempEndY,
			
			polygonX, polygonY,
			polygonPoints,
			polygonScaleX, polygonScaleY,
			polygonSin, polygonCos) === true) {
				return true;
			}
			
			let length = polygonPoints.length;
			
			for (let i = 0, j = length - 1; i < length; j = i, i += 1) {
				
				let iX = polygonPoints[i].x * polygonScaleX;
				let iY = polygonPoints[i].y * polygonScaleY;
				
				let jX = polygonPoints[j].x * polygonScaleX;
				let jY = polygonPoints[j].y * polygonScaleY;
				
				let polygonPoint1X = polygonX + polygonCos * iX - polygonSin * iY;
				let polygonPoint1Y = polygonY + polygonSin * iX + polygonCos * iY;
				
				let polygonPoint2X = polygonX + polygonCos * jX - polygonSin * jY;
				let polygonPoint2Y = polygonY + polygonSin * jX + polygonCos * jY;
				
				if (checkLineLine(0, 0, lineTempStartX, lineTempStartY, lineTempEndX, lineTempEndY, 1, 1, 0, 1, 0, 0, polygonPoint1X, polygonPoint1Y, polygonPoint2X, polygonPoint2Y, 1, 1, 0, 1) === true) {
					return true;
				}
			}
			
			return false;
		};
		
		let checkRectRect = self.checkRectRect = (
			aX, aY,
			aWidth, aHeight,
			aScaleX, aScaleY,
			aSin, aCos,
			
			bX, bY,
			bWidth, bHeight,
			bScaleX, bScaleY,
			bSin, bCos
		) => {
			
			aWidth *= aScaleX;
			aHeight *= aScaleY;
			
			bWidth *= bScaleX;
			bHeight *= bScaleY;
			
			let aPoint1X, aPoint1Y;
			let aPoint2X, aPoint2Y;
			let aPoint3X, aPoint3Y;
			let aPoint4X, aPoint4Y;
			
			let aCW = aCos * aWidth / 2;	let aCH = aCos * aHeight / 2;
			let aSW = -aSin * aWidth / 2;	let aSH = -aSin * aHeight / 2;
			
			aPoint1X = aX - aCW - aSH;	aPoint1Y = aY + aSW - aCH;
			aPoint2X = aX + aCW - aSH;	aPoint2Y = aY - aSW - aCH;
			aPoint3X = aX + aCW + aSH;	aPoint3Y = aY - aSW + aCH;
			aPoint4X = aX - aCW + aSH;	aPoint4Y = aY + aSW + aCH;
			
			if (checkPointInRect(
			aPoint1X, aPoint1Y,
			
			bX, bY,
			bWidth, bHeight,
			1, 1,
			bSin, bCos) === true ||
				
			checkPointInRect(
			aPoint2X, aPoint2Y,
			
			bX, bY,
			bWidth, bHeight,
			1, 1,
			bSin, bCos) === true ||
				
			checkPointInRect(
			aPoint3X, aPoint3Y,
			
			bX, bY,
			bWidth, bHeight,
			1, 1,
			bSin, bCos) === true ||
				
			checkPointInRect(
			aPoint4X, aPoint4Y,
			
			bX, bY,
			bWidth, bHeight,
			1, 1,
			bSin, bCos) === true) {
				return true;
			}
			
			let bPoint1X, bPoint1Y;
			let bPoint2X, bPoint2Y;
			let bPoint3X, bPoint3Y;
			let bPoint4X, bPoint4Y;
			
			let bCW = bCos * bWidth / 2;	let bCH = bCos * bHeight / 2;
			let bSW = -bSin * bWidth / 2;	let bSH = -bSin * bHeight / 2;
			
			bPoint1X = bX - bCW - bSH;	bPoint1Y = bY + bSW - bCH;
			bPoint2X = bX + bCW - bSH;	bPoint2Y = bY - bSW - bCH;
			bPoint3X = bX + bCW + bSH;	bPoint3Y = bY - bSW + bCH;
			bPoint4X = bX - bCW + bSH;	bPoint4Y = bY + bSW + bCH;
			
			if (checkPointInRect(
			bPoint1X, bPoint1Y,
			
			aX, aY,
			aWidth, aHeight,
			1, 1,
			aSin, aCos) === true ||
				
			checkPointInRect(
			bPoint2X, bPoint2Y,
			
			aX, aY,
			aWidth, aHeight,
			1, 1,
			aSin, aCos) === true ||
				
			checkPointInRect(
			bPoint3X, bPoint3Y,
			
			aX, aY,
			aWidth, aHeight,
			1, 1,
			aSin, aCos) === true ||
				
			checkPointInRect(
			bPoint4X, bPoint4Y,
			
			aX, aY,
			aWidth, aHeight,
			1, 1,
			aSin, aCos) === true) {
				return true;
			}
			
			return checkLineLine(0, 0, aPoint1X, aPoint1Y, aPoint2X, aPoint2Y, 1, 1, 0, 1, 0, 0, bPoint1X, bPoint1Y, bPoint2X, bPoint2Y, 1, 1, 0, 1) === true ||
				checkLineLine(0, 0, aPoint1X, aPoint1Y, aPoint2X, aPoint2Y, 1, 1, 0, 1, 0, 0, bPoint2X, bPoint2Y, bPoint3X, bPoint3Y, 1, 1, 0, 1) === true ||
				checkLineLine(0, 0, aPoint1X, aPoint1Y, aPoint2X, aPoint2Y, 1, 1, 0, 1, 0, 0, bPoint3X, bPoint3Y, bPoint4X, bPoint4Y, 1, 1, 0, 1) === true ||
				checkLineLine(0, 0, aPoint1X, aPoint1Y, aPoint2X, aPoint2Y, 1, 1, 0, 1, 0, 0, bPoint4X, bPoint4Y, bPoint1X, bPoint1Y, 1, 1, 0, 1) === true ||
				
				checkLineLine(0, 0, aPoint2X, aPoint2Y, aPoint3X, aPoint3Y, 1, 1, 0, 1, 0, 0, bPoint1X, bPoint1Y, bPoint2X, bPoint2Y, 1, 1, 0, 1) === true ||
				checkLineLine(0, 0, aPoint2X, aPoint2Y, aPoint3X, aPoint3Y, 1, 1, 0, 1, 0, 0, bPoint2X, bPoint2Y, bPoint3X, bPoint3Y, 1, 1, 0, 1) === true ||
				checkLineLine(0, 0, aPoint2X, aPoint2Y, aPoint3X, aPoint3Y, 1, 1, 0, 1, 0, 0, bPoint3X, bPoint3Y, bPoint4X, bPoint4Y, 1, 1, 0, 1) === true ||
				checkLineLine(0, 0, aPoint2X, aPoint2Y, aPoint3X, aPoint3Y, 1, 1, 0, 1, 0, 0, bPoint4X, bPoint4Y, bPoint1X, bPoint1Y, 1, 1, 0, 1) === true ||
				
				checkLineLine(0, 0, aPoint3X, aPoint3Y, aPoint4X, aPoint4Y, 1, 1, 0, 1, 0, 0, bPoint1X, bPoint1Y, bPoint2X, bPoint2Y, 1, 1, 0, 1) === true ||
				checkLineLine(0, 0, aPoint3X, aPoint3Y, aPoint4X, aPoint4Y, 1, 1, 0, 1, 0, 0, bPoint2X, bPoint2Y, bPoint3X, bPoint3Y, 1, 1, 0, 1) === true ||
				checkLineLine(0, 0, aPoint3X, aPoint3Y, aPoint4X, aPoint4Y, 1, 1, 0, 1, 0, 0, bPoint3X, bPoint3Y, bPoint4X, bPoint4Y, 1, 1, 0, 1) === true ||
				checkLineLine(0, 0, aPoint3X, aPoint3Y, aPoint4X, aPoint4Y, 1, 1, 0, 1, 0, 0, bPoint4X, bPoint4Y, bPoint1X, bPoint1Y, 1, 1, 0, 1) === true ||
				
				checkLineLine(0, 0, aPoint4X, aPoint4Y, aPoint1X, aPoint1Y, 1, 1, 0, 1, 0, 0, bPoint1X, bPoint1Y, bPoint2X, bPoint2Y, 1, 1, 0, 1) === true ||
				checkLineLine(0, 0, aPoint4X, aPoint4Y, aPoint1X, aPoint1Y, 1, 1, 0, 1, 0, 0, bPoint2X, bPoint2Y, bPoint3X, bPoint3Y, 1, 1, 0, 1) === true ||
				checkLineLine(0, 0, aPoint4X, aPoint4Y, aPoint1X, aPoint1Y, 1, 1, 0, 1, 0, 0, bPoint3X, bPoint3Y, bPoint4X, bPoint4Y, 1, 1, 0, 1) === true ||
				checkLineLine(0, 0, aPoint4X, aPoint4Y, aPoint1X, aPoint1Y, 1, 1, 0, 1, 0, 0, bPoint4X, bPoint4Y, bPoint1X, bPoint1Y, 1, 1, 0, 1) === true;
		};
		
		let checkRectCircle = self.checkRectCircle = (
			rectX, rectY,
			rectWidth, rectHeight,
			rectScaleX, rectScaleY,
			rectSin, rectCos,
			
			circleX, circleY,
			circleWidth, circleHeight,
			circleScaleX, circleScaleY,
			circleSin, circleCos) => {
			
			if (checkPointInRect(
			circleX, circleY,
			
			rectX, rectY,
			rectWidth, rectHeight,
			rectScaleX, rectScaleY,
			rectSin, rectCos) === true) {
				return true;
			}
			
			let rectPoint1X, rectPoint1Y;
			let rectPoint2X, rectPoint2Y;
			let rectPoint3X, rectPoint3Y;
			let rectPoint4X, rectPoint4Y;
			
			rectWidth *= rectScaleX / 2;
			rectHeight *= rectScaleY / 2;
			
			let cw = rectCos * rectWidth;	let ch = rectCos * rectHeight;
			let sw = -rectSin * rectWidth;	let sh = -rectSin * rectHeight;
			
			rectPoint1X = rectX - cw - sh;	rectPoint1Y = rectY + sw - ch;
			rectPoint2X = rectX + cw - sh;	rectPoint2Y = rectY - sw - ch;
			rectPoint3X = rectX + cw + sh;	rectPoint3Y = rectY - sw + ch;
			rectPoint4X = rectX - cw + sh;	rectPoint4Y = rectY + sw + ch;
			
			if (checkPointInCircle(
			rectPoint1X, rectPoint1Y,
			
			circleX, circleY,
			circleWidth, circleHeight,
			circleScaleX, circleScaleY,
			circleSin, circleCos) === true ||
				
			checkPointInCircle(
			rectPoint2X, rectPoint2Y,
			
			circleX, circleY,
			circleWidth, circleHeight,
			circleScaleX, circleScaleY,
			circleSin, circleCos) === true ||
				
			checkPointInCircle(
			rectPoint3X, rectPoint3Y,
			
			circleX, circleY,
			circleWidth, circleHeight,
			circleScaleX, circleScaleY,
			circleSin, circleCos) === true ||
				
			checkPointInCircle(
			rectPoint4X, rectPoint4Y,
			
			circleX, circleY,
			circleWidth, circleHeight,
			circleScaleX, circleScaleY,
			circleSin, circleCos) === true) {
				return true;
			}
			
			circleWidth *= circleScaleX;
			circleHeight *= circleScaleY;
			
			return checkLineCircle(0, 0, rectPoint1X, rectPoint1Y, rectPoint2X, rectPoint2Y, 1, 1, 0, 1, circleX, circleY, circleWidth, circleHeight, 1, 1, circleSin, circleCos) === true ||
				checkLineCircle(0, 0, rectPoint2X, rectPoint2Y, rectPoint3X, rectPoint3Y, 1, 1, 0, 1, circleX, circleY, circleWidth, circleHeight, 1, 1, circleSin, circleCos) === true ||
				checkLineCircle(0, 0, rectPoint3X, rectPoint3Y, rectPoint4X, rectPoint4Y, 1, 1, 0, 1, circleX, circleY, circleWidth, circleHeight, 1, 1, circleSin, circleCos) === true ||
				checkLineCircle(0, 0, rectPoint4X, rectPoint4Y, rectPoint1X, rectPoint1Y, 1, 1, 0, 1, circleX, circleY, circleWidth, circleHeight, 1, 1, circleSin, circleCos) === true;
		};
		
		let checkRectPolygon = self.checkRectPolygon = (
			rectX, rectY,
			rectWidth, rectHeight,
			rectScaleX, rectScaleY,
			rectSin, rectCos,
			
			polygonX, polygonY,
			polygonPoints,
			polygonScaleX, polygonScaleY,
			polygonSin, polygonCos
		) => {
			
			rectWidth *= rectScaleX;
			rectHeight *= rectScaleY;
			
			let rectPoint1X, rectPoint1Y;
			let rectPoint2X, rectPoint2Y;
			let rectPoint3X, rectPoint3Y;
			let rectPoint4X, rectPoint4Y;
			
			let cw = rectCos * rectWidth / 2;	let ch = rectCos * rectHeight / 2;
			let sw = -rectSin * rectWidth / 2;	let sh = -rectSin * rectHeight / 2;
			
			rectPoint1X = rectX - cw - sh;	rectPoint1Y = rectY + sw - ch;
			rectPoint2X = rectX + cw - sh;	rectPoint2Y = rectY - sw - ch;
			rectPoint3X = rectX + cw + sh;	rectPoint3Y = rectY - sw + ch;
			rectPoint4X = rectX - cw + sh;	rectPoint4Y = rectY + sw + ch;
			
			if (checkPointInPolygon(
			rectPoint1X, rectPoint1Y,
			
			polygonX, polygonY,
			polygonPoints,
			polygonScaleX, polygonScaleY,
			polygonSin, polygonCos) === true ||
				
			checkPointInPolygon(
			rectPoint2X, rectPoint2Y,
			
			polygonX, polygonY,
			polygonPoints,
			polygonScaleX, polygonScaleY,
			polygonSin, polygonCos) === true ||
				
			checkPointInPolygon(
			rectPoint3X, rectPoint3Y,
			
			polygonX, polygonY,
			polygonPoints,
			polygonScaleX, polygonScaleY,
			polygonSin, polygonCos) === true ||
				
			checkPointInPolygon(
			rectPoint4X, rectPoint4Y,
			
			polygonX, polygonY,
			polygonPoints,
			polygonScaleX, polygonScaleY,
			polygonSin, polygonCos) === true) {
				return true;
			}
			
			let length = polygonPoints.length;
			
			for (let i = 0, j = length - 1; i < length; j = i, i += 1) {
				
				let iX = polygonPoints[i].x * polygonScaleX;
				let iY = polygonPoints[i].y * polygonScaleY;
				
				let polygonPoint1X = polygonX + polygonCos * iX - polygonSin * iY;
				let polygonPoint1Y = polygonY + polygonSin * iX + polygonCos * iY;
				
				if (checkPointInRect(
				polygonPoint1X, polygonPoint1Y,
				
				rectX, rectY,
				rectWidth, rectHeight,
				1, 1,
				rectSin, rectCos) === true) {
					return true;
				}
				
				let jX = polygonPoints[j].x * polygonScaleX;
				let jY = polygonPoints[j].y * polygonScaleY;
				
				let polygonPoint2X = polygonX + polygonCos * jX - polygonSin * jY;
				let polygonPoint2Y = polygonY + polygonSin * jX + polygonCos * jY;
				
				if (
				checkLineLine(0, 0, rectPoint1X, rectPoint1Y, rectPoint2X, rectPoint2Y, 1, 1, 0, 1, 0, 0, polygonPoint1X, polygonPoint1Y, polygonPoint2X, polygonPoint2Y, 1, 1, 0, 1) === true ||
				checkLineLine(0, 0, rectPoint2X, rectPoint2Y, rectPoint3X, rectPoint3Y, 1, 1, 0, 1, 0, 0, polygonPoint1X, polygonPoint1Y, polygonPoint2X, polygonPoint2Y, 1, 1, 0, 1) === true ||
				checkLineLine(0, 0, rectPoint3X, rectPoint3Y, rectPoint4X, rectPoint4Y, 1, 1, 0, 1, 0, 0, polygonPoint1X, polygonPoint1Y, polygonPoint2X, polygonPoint2Y, 1, 1, 0, 1) === true ||
				checkLineLine(0, 0, rectPoint4X, rectPoint4Y, rectPoint1X, rectPoint1Y, 1, 1, 0, 1, 0, 0, polygonPoint1X, polygonPoint1Y, polygonPoint2X, polygonPoint2Y, 1, 1, 0, 1) === true) {
					return true;
				}
			}
			
			return false;
		};
		
		let realRoot = (z4, z3, z2, z1, z0) => {
			
			if (z0 === 0) {
				return true;
			}
			if (z4 === 0) {
				if (z3 !== 0) {
					return true;
				}
				if (z2 !== 0) {
					return (z1 * z1 - 4 * z2 * z0) >= 0;
				}
				return z1 !== 0;
			}
			
			let a = z3 / z4;
			let b = z2 / z4;
			let c = z1 / z4;
			let d = z0 / z4;
			let p = (8 * b - 3 * a * a) / 8;
			let q = (a * a * a - 4 * a * b + 8 * c) / 8;
			let r = (-3 * a * a * a * a + 256 * d - 64 * c * a + 16 * a * a * b) / 256;
			
			let descrim = 256 * r * r * r - 128 * p * p * r * r + 144 * p * q * q * r - 27 * q * q * q * q + 16 * p * p * p * p * r - 4 * p * p * p * q * q;
			let P = 8 * p;
			let D = 64 * r - 16 * p * p;
			
			return descrim < 0 || (descrim > 0 && P < 0 && D < 0) || (descrim === 0 && (D !== 0 || P <= 0));
		};
		
		let yIntersect = (aa, ab, ac, ad, ae, af, ba, bb, bc, bd, be, bf) => {
			
			let deltaB = (bb /= ba) - (ab /= aa);
			let deltaC = (bc /= ba) - (ac /= aa);
			let deltaD = (bd /= ba) - (ad /= aa);
			let deltaE = (be /= ba) - (ae /= aa);
			let deltaF = (bf /= ba) - (af /= aa);
			
			if (deltaB === 0 && deltaD === 0) {
				return realRoot(0, 0, deltaC, deltaE, deltaF);
			}
			
			let a3 = ab * bc - bb * ac;
			let a2 = ab * be + ad * bc - bb * ae - bd * ac;
			let a1 = ab * bf + ad * be - bb * af - bd * ae;
			let a0 = ad * bf - bd * af;
			
			let A = deltaC * deltaC - a3 * deltaB;
			let B = 2 * deltaC * deltaE - deltaB * a2 - deltaD * a3;
			let C = deltaE * deltaE + 2 * deltaC * deltaF - deltaB * a1 - deltaD * a2;
			let D = 2 * deltaE * deltaF - deltaD * a1 - deltaB * a0;
			let E = deltaF * deltaF - deltaD * a0;
			
			return realRoot(A, B, C, D, E);
		};
		
		let checkCircleCircle = self.checkCircleCircle = (
			aX, aY,
			aWidth, aHeight,
			aScaleX, aScaleY,
			aSin, aCos,
			
			bX, bY,
			bWidth, bHeight,
			bScaleX, bScaleY,
			bSin, bCos
		) => {
			
			aWidth *= aScaleX;
			aHeight *= aScaleY;
			
			bWidth *= bScaleX;
			bHeight *= bScaleY;
			
			bX -= aX;
			bY -= aY;
			aX = aY = 0;
			
			let maxR = ((aWidth > aHeight ? aWidth : aHeight) + (bWidth > bHeight ? bWidth : bHeight)) / 2;
			
			if (bX * bX + bY * bY > maxR * maxR) {
				return false;
			}
			
			if (
			checkPointInCircle(bX, bY, aX, aY, aWidth, aHeight, 1, 1, aSin, aCos) === true ||
			checkPointInCircle(aX, aY, bX, bY, bWidth, bHeight, 1, 1, bSin, bCos) === true) {
				return true;
			}
			
			// create bivariate forms
			
			let a = aCos * aX + aSin * aY;
			let c = -aSin * aX + aCos * aY;
			
			aSin = -aSin;
			
			let b = aWidth * aWidth / 4;
			let d = aHeight * aHeight / 4;
			
			let aa = (aCos * aCos / b) + (aSin * aSin / d);
			let ab = (-2 * aCos * aSin / b) + (2 * aCos * aSin / d);
			let ac = (aSin * aSin / b) + (aCos * aCos / d);
			let ad = (-2 * a * aCos / b) - (2 * c * aSin / d);
			let ae = (2 * a * aSin / b) - (2 * c * aCos / d);
			let af = (a * a / b) + (c * c / d) - 1;
			
			a = bCos * bX + bSin * bY;
			c = -bSin * bX + bCos * bY;
			
			bSin = -bSin;
			
			b = bWidth * bWidth / 4;
			d = bHeight * bHeight / 4;
			
			let ba = (bCos * bCos / b) + (bSin * bSin / d);
			let bb = (-2 * bCos * bSin / b) + (2 * bCos * bSin / d);
			let bc = (bSin * bSin / b) + (bCos * bCos / d);
			let bd = (-2 * a * bCos / b) - (2 * c * bSin / d);
			let be = (2 * a * bSin / b) - (2 * c * bCos / d);
			let bf = (a * a / b) + (c * c / d) - 1;
			
			return yIntersect(aa, ab, ac, ad, ae, af, ba, bb, bc, bd, be, bf) && yIntersect(ac, ab, aa, ae, ad, af, bc, bb, ba, be, bd, bf);
		};
		
		let checkCirclePolygon = self.checkCirclePolygon = (
			circleX, circleY,
			circleWidth, circleHeight,
			circleScaleX, circleScaleY,
			circleSin, circleCos,
			
			polygonX, polygonY,
			polygonPoints,
			polygonScaleX, polygonScaleY,
			polygonSin, polygonCos
		) => {
			
			if (checkPointInPolygon(
			circleX, circleY,
			
			polygonX, polygonY,
			polygonPoints,
			polygonScaleX, polygonScaleY,
			polygonSin, polygonCos) === true) {
				return true;
			}
			
			circleWidth *= circleScaleX;
			circleHeight *= circleScaleY;
			
			let length = polygonPoints.length;
			
			for (let i = 0, j = length - 1; i < length; j = i, i += 1) {
				
				let iX = polygonPoints[i].x * polygonScaleX;
				let iY = polygonPoints[i].y * polygonScaleY;
				
				let polygonPoint1X = polygonX + polygonCos * iX - polygonSin * iY;
				let polygonPoint1Y = polygonY + polygonSin * iX + polygonCos * iY;
				
				if (checkPointInCircle(
				polygonPoint1X, polygonPoint1Y,
				
				circleX, circleY,
				circleWidth, circleHeight,
				1, 1,
				circleSin, circleCos) === true) {
					return true;
				}
				
				let jX = polygonPoints[j].x * polygonScaleX;
				let jY = polygonPoints[j].y * polygonScaleY;
				
				let polygonPoint2X = polygonX + polygonCos * jX - polygonSin * jY;
				let polygonPoint2Y = polygonY + polygonSin * jX + polygonCos * jY;
				
				if (checkLineCircle(0, 0, polygonPoint1X, polygonPoint1Y, polygonPoint2X, polygonPoint2Y, 1, 1, 0, 1, circleX, circleY, circleWidth, circleHeight, 1, 1, circleSin, circleCos) === true) {
					return true;
				}
			}
			
			return false;
		};
		
		let checkPolygonPolygon = self.checkPolygonPolygon = (
			aX, aY,
			aPoints,
			aScaleX, aScaleY,
			aSin, aCos,
			
			bX, bY,
			bPoints,
			bScaleX, bScaleY,
			bSin, bCos
		) => {
			
			let aLength = aPoints.length;
			let bLength = bPoints.length;
			
			for (let i = 0, j = bLength - 1; i < bLength; j = i, i += 1) {
				
				let iX = bPoints[i].x * bScaleX;
				let iY = bPoints[i].y * bScaleY;
				
				let bPoint1X = bX + bCos * iX - bSin * iY;
				let bPoint1Y = bY + bSin * iX + bCos * iY;
				
				if (checkPointInPolygon(
				bPoint1X, bPoint1Y,
				
				aX, aY,
				aPoints,
				aScaleX, aScaleY,
				aSin, aCos) === true) {
					return true;
				}
			}
			
			for (let i = 0, j = aLength - 1; i < aLength; j = i, i += 1) {
				
				let iX = aPoints[i].x * aScaleX;
				let iY = aPoints[i].y * aScaleY;
				
				let aPoint1X = aX + aCos * iX - aSin * iY;
				let aPoint1Y = aY + aSin * iX + aCos * iY;
				
				if (checkPointInPolygon(
				aPoint1X, aPoint1Y,
				
				bX, bY,
				bPoints,
				bScaleX, bScaleY,
				bSin, bCos) === true) {
					return true;
				}
				
				let jX = aPoints[j].x * aScaleX;
				let jY = aPoints[j].y * aScaleY;
				
				let aPoint2X = aX + aCos * jX - aSin * jY;
				let aPoint2Y = aY + aSin * jX + aCos * jY;
				
				for (let k = 0, l = bLength - 1; k < bLength; l = k, k += 1) {
					
					let kX = bPoints[k].x * bScaleX;
					let kY = bPoints[k].y * bScaleY;
					
					let bPoint1X = bX + bCos * kX - bSin * kY;
					let bPoint1Y = bY + bSin * kX + bCos * kY;
					
					let lX = bPoints[l].x * bScaleX;
					let lY = bPoints[l].y * bScaleY;
					
					let bPoint2X = bX + bCos * lX - bSin * lY;
					let bPoint2Y = bY + bSin * lX + bCos * lY;
					
					if (checkLineLine(0, 0, aPoint1X, aPoint1Y, aPoint2X, aPoint2Y, 1, 1, 0, 1, 0, 0, bPoint1X, bPoint1Y, bPoint2X, bPoint2Y, 1, 1, 0, 1) === true) {
						return true;
					}
				}
			}
			
			return false;
		};
	}
});
