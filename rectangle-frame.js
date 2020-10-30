/**
 * 
 * Copyright 2020 Mjduniverse
 * @author Mjduniverse
 * 
 * @license
 *
 * Permission is hereby granted, free of charge, to any person obtaining a 
 * copy of this software and associated documentation files (the "Software"), 
 * to deal in the Software without restriction, including without limitation 
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, 
 * and/or sell copies of the Software, and to permit persons to whom the 
 * Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included 
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, 
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES 
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
 * DEALINGS IN THE SOFTWARE.
 */

/**
 * 
 * Rectangle Frame Constructor
 * 
 * @constructor
 * @param {Number} x - x-coordinate
 * @param {Number} y - y-coordinate
 * @param {Number} w - width
 * @param {Number} h - height
 */

function RectangleFrame(x,y,w,h) {
       
    /** The top left corner of the rectangle */

    this.topLeft = {
        "x": x,
        "y": y
      }

      /** The top right corner of the rectangle */
    
      this.topRight = {
        "x": x + w,
        "y": y
      }

      /** The bottom left corner of the rectangle */
    
      this.bottomLeft = {
        "x": x,
        "y": y + h
      }

      /** The bottom right corner of the rectangle */
    
      this.bottomRight = {
        "x": x + w,
        "y": y + h
      }
    
     this.angle = 0;
     this.upperAngle = 0;

  }

/**
 * 
 * Preview a rectangle's points using a 2d canvas context
 * 
 * @function
 * @param {CanvasRenderingContext2D} ctx 
 * 
 */


RectangleFrame.prototype.drawPoints = function(ctx) {
  
  ctx.beginPath();
  ctx.fillStyle = "red";
  ctx.arc(this.topLeft.x,this.topLeft.y,3,0,2*Math.PI)
  ctx.fill();
  ctx.stroke();
  
  ctx.beginPath(); 
  ctx.fillStyle = "green";
  ctx.arc(this.topRight.x,this.topRight.y,3,0,2*Math.PI);
  ctx.fill();
  ctx.stroke();
  
  ctx.beginPath(); 
  ctx.fillStyle = "blue";
  ctx.arc(this.bottomLeft.x,this.bottomLeft.y,3,0,2*Math.PI);
  ctx.fill();
  ctx.stroke();
  
  ctx.beginPath(); 
  ctx.fillStyle = "yellow";
  ctx.arc(this.bottomRight.x,this.bottomRight.y,3,0,2*Math.PI);
  ctx.fill();
  ctx.stroke();
  
}

/**
 * 
 * Rotate vector around origin
 * 
 * @function
 * @param {Object} v - Vector Object
 * @param {Number} a - Angle
 * @returns {Object}
 * 
 */

RectangleFrame.prototype.rotateVec = function(v,a) {
  return {
    "x": v.x * Math.cos(a) + v.y * -Math.sin(a),
    "y": v.x * Math.sin(a) + v.y * Math.cos(a)
  }
}

/**
 * 
 * Transform rectangle by the vector (x,y)
 * 
 * 
 * @function
 * @param {Number} x - The x-coordinate
 * @param {Number} y - The y-coordinate
 */
  
RectangleFrame.prototype.transform = function(x,y) {
  
  this.topLeft.x = this.topLeft.x + x;
  this.topLeft.y = this.topLeft.y + y;
  
  this.topRight.x = this.topRight.x + x;
  this.topRight.y = this.topRight.y + y;
  
  this.bottomLeft.x = this.bottomLeft.x + x;
  this.bottomLeft.y = this.bottomLeft.y + y;
  
  this.bottomRight.x = this.bottomRight.x + x;
  this.bottomRight.y = this.bottomRight.y + y;

  this.updateStdRect();

}

/**
 * 
 * Rotate rectangle around center
 * 
 * @function
 * @param {Number} a - angle in radians
 */

RectangleFrame.prototype.rotateAroundCenter = function(a) {
  
  var c = this.getCentroid();
  this.transform(-c.x,-c.y);
  
  this.topLeft = this.rotateVec(this.topLeft,a)
  this.topRight = this.rotateVec(this.topRight,a)
  this.bottomLeft = this.rotateVec(this.bottomLeft,a)
  this.bottomRight = this.rotateVec(this.bottomRight,a)
  
  this.angle = this.angle + a;
  
  this.transform(c.x,c.y);

  this.updateStdRect();

}

/**
 * Rotate rectangle around upper left corner
 * @param {Number} a - Angle in radians
 */

RectangleFrame.prototype.rotateAroundUpperCorner = function(a) {
  
  var vx = this.topLeft.x;
  var vy = this.topLeft.y;
  this.transform(-this.topLeft.x,-this.topLeft.y);
  
  this.topLeft = this.rotateVec(this.topLeft,a)
  this.topRight = this.rotateVec(this.topRight,a)
  this.bottomLeft = this.rotateVec(this.bottomLeft,a)
  this.bottomRight = this.rotateVec(this.bottomRight,a)
  
  this.angle = this.angle + a;
  
  this.transform(vx,vy);

  this.updateStdRect();

}

/**
 * @function
 * @return {Object}
 * 
 * Get centroid of the rectangle
 * 
 */

RectangleFrame.prototype.getCentroid = function() {
  
  var vx = (this.topLeft.x + this.topRight.x + this.bottomLeft.x + this.bottomRight.x) / 4;
  
  var vy = (this.topLeft.y + this.topRight.y + this.bottomLeft.y + this.bottomRight.y) / 4;
  
  return {
    "x": vx,
    "y": vy,
  }
  
}

/** 
 * 
 * @function
 * @returns {Object}
 * 
 * Get x-axis vector of the rotated frame of reference.
 * 
*/

RectangleFrame.prototype.getUnitXAxis = function() {
    return {
      "x": Math.cos(this.angle),
      "y": Math.sin(this.angle)
    }
}

/** 
 * 
 * @function getUnitYAxis
 * Get y-axis vector of the rotated frame of reference.
 * 
*/

RectangleFrame.prototype.getUnitYAxis = function() {
    return {
      "x": -Math.sin(this.angle),
      "y": Math.cos(this.angle)
    }
}

/** 
 * 
 * @function
 * @param {Number} l - Length of Vector
 * @param {Number} a - Angle in radians
 * 
 * Get vector defined by angle and length.
 * 
 * 
*/

RectangleFrame.prototype.getVectorByLengthAndAngle = function(l,a) {
  return {
    "x": Math.cos(a) * l,
    "y": Math.sin(a) * l
  }
}

/** 
 * 
 * @function
 * Create new vector by adding two vectorsw
 * 
*/

RectangleFrame.prototype.addVectors = function(v1,v2) {
    return {
        "x": v1.x + v2.x,
        "y": v1.y + v2.y
    }
}

/** 
 * 
 * Create new vector by multiplying a vector by a scalar.
 * 
 * @function
 * @param {object} v -  Vector
 * @param {Number} s - Scalar
 * 
*/

RectangleFrame.prototype.multiplyVector = function(v,s) {
    return {
        "x": v.x * s,
        "y": v.y * s
    }
}


/** 
 * 
 * Transform a corner by a vector relative to the rotated frame of reference
 * 
 * @function
 * @param {object} v -  Vector
 * @param {Number} s - Scalar
 * 
*/

RectangleFrame.prototype.transformRelCorner = function(name,x,y) {

  var dx = this.multiplyVector(this.getUnitXAxis(),x);
  var dy = this.multiplyVector(this.getUnitYAxis(),y);
  
  
  if(name === "bottomRight") {

      this.bottomRight = this.addVectors(this.bottomRight,dx);
      this.bottomRight = this.addVectors(this.bottomRight,dy);

      this.topRight = this.addVectors(this.topRight,dx);
      this.bottomLeft = this.addVectors(this.bottomLeft,dy);
  }

  if(name === "topLeft") {

      this.topLeft = this.addVectors(this.topLeft,dx);
      this.topLeft = this.addVectors(this.topLeft,dy);

      this.bottomLeft = this.addVectors(this.bottomLeft,dx);
      this.topRight = this.addVectors(this.topRight,dy);

  }

  if(name === "bottomLeft") {

      this.bottomLeft = this.addVectors(this.bottomLeft,dx);
      this.bottomLeft = this.addVectors(this.bottomLeft,dy);

      this.topLeft = this.addVectors(this.topLeft,dx);
      this.bottomRight = this.addVectors(this.bottomRight,dy);

  }

  if(name === "topRight") {

      this.topRight = this.addVectors(this.topRight,dx);
      this.topRight = this.addVectors(this.topRight,dy);

      this.bottomRight = this.addVectors(this.bottomRight,dx)
      this.topLeft = this.addVectors(this.topLeft,dy);

  }

  this.updateStdRect();

}

/**
 * 
 * Transform corner by some vector (x,y);
 * 
 * @function transformCorner
 * @param {*} name 
 * @param {*} x 
 * @param {*} y 
 */


RectangleFrame.prototype.transformCorner = function(name,x,y) {

  var v = {
      "x":x,
      "y":y
  }

  v = this.rotateVec(v,-this.angle);

  this.transformRelCorner(name,v.x,v.y);

}

/**
 * 
 * Set corner to a point (x,y)
 * 
 * @function setCorner
 * @param {String} name 
 * @param {Number} x 
 * @param {Number} y 
 * 
 */

RectangleFrame.prototype.setCorner = function(name,x,y) {
  this.transformCorner(name,-this[name].x,-this[name].y);
  this.transformCorner(name,x,y);    
}

/**
 * 
 * Get point relative to the rotated frame of reference
 * 
 * @function relativePoint
 * @param {Number} x 
 * @param {Number} y 
 */

RectangleFrame.prototype.relativePoint = function(x,y) {
  return {
    "x": x * Math.cos(this.angle) - y * Math.sin(this.angle),
    "y": x * Math.sin(this.angle) + y * Math.cos(this.angle)
  }
}

/**
 * 
 * Calculate vector distance
 * 
 * @function calculateVectorDistance
 * @param {Object} v1 
 * @param {Object} v2 
 * @return {Number}
 * 
 */

RectangleFrame.prototype.calculateVectorDistance = function(v1,v2) {
  return Math.sqrt( Math.pow(v1.x - v2.x,2) + Math.pow(v1.y - v2.y,2) )
}

/**
 * Update standard rectangle defined by width, height and upper left corner
 * @function
 */

RectangleFrame.prototype.updateStdRect = function() {
    this.x = this.topLeft.x;
    this.y = this.topLeft.y;
    this.w = this.calculateVectorDistance(this.topLeft,this.topRight);
    this.h = this.calculateVectorDistance(this.topLeft,this.bottomLeft);
}

/**
 * 
 * Get centroid of an array of vectors
 * 
 * @function
 * @param {Array} setArray 
 * @returns {Object}
 * 
 */

RectangleFrame.prototype.getVectorSetCentroid = function(setArray) {
  
  var s = {
    "x": 0,
    "y": 0
  };

  for(var i = 0; i < setArray.length; i++) {
    s.x = s.x + setArray[i].x;
    s.y = s.y + setArray[i].y;
  }
}

/**
 * Get point but cancel out the angle.
 * 
 * @function
 * @returns {Object}
 */

RectangleFrame.prototype.getUnrotatedRawUpperPoint = function() {
  
  var a = this.angle;

  this.rotateAroundCenter(-a);

  var v = {
    "x": this.topLeft.x,
    "y": this.topRight.y,
  }

  this.rotateAroundCenter(a);

  return v;

}


// NodeJS support

if(typeof module.exports === "object") {
  module.exports = RectangleFrame;
}

