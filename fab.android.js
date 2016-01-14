﻿/***************************************************************
 * Made for the {N} community by Brad Martin @BradWayneMartin
 * https://twitter.com/BradWayneMartin
 * https://github.com/bradmartin
 * Pull requests are welcome. Enjoy!
 **************************************************************/

 var common = require("./fab-common");
 var utils = require("utils/utils");

 require("utils/module-merge").merge(common, module.exports);

 var FloatingActionButton = (function (_super) {

     global.__extends(FloatingActionButton, _super);

     function FloatingActionButton() {
         _super.apply(this, arguments);
     }

     FloatingActionButton.prototype._createUI = function () {
         this._android = new android.support.design.widget.FloatingActionButton(this._context);

         if(this.rippleColor)
            this._android.setRippleColor(this.rippleColor.android);

         if(this.backgroundColor)
            this._android.setBackgroundTintList(android.content.res.ColorStateList.valueOf(this.backgroundColor.android));

        if(this.icon){
          var res = utils.ad.getApplicationContext().getResources();
          if(res){
            var identifier = res.getIdentifier(this.icon, 'drawable', utils.ad.getApplication().getPackageName());
            var bitmapDrawable = res.getDrawable(identifier);
            this._android.setImageDrawable(bitmapDrawable);
          } 
        }

         var that = new WeakRef(this);

         this._android.setOnClickListener(new android.view.View.OnClickListener({
              get owner() {
                  return that.get();
              },

              onClick: function (v) {
                  if (this.owner) {
                      this.owner._emit("tap");
                  }
              }
        }));
     };

     Object.defineProperty(FloatingActionButton.prototype, "android", {
         get: function () {
             return this._android;
         }
     });

     return FloatingActionButton;

 })(common.FloatingActionButton);

 exports.FloatingActionButton = FloatingActionButton;
