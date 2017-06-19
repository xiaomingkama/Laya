/*
* name;
*/
var BaseView = (function () {

    /**
     * 构造函数
     * @param controller {BaseController}
     */
    function BaseView(controller) {
        BaseView.__super.call(this);
        this._isInit = false;
        this._controller = controller;
        this._resouce = null;
        //初始化这个view需要的资源
        this.initRes();

        App.StageUtils.getStage().on(Laya.Event.RESIZE, this, this.onResize);
    }

    Laya.class(BaseView, "BaseView", BaseSprite);
    var _proto_ = BaseView.prototype;
    var _super_ = BaseView.__super.prototype;
    var _getset_ = Laya.getset;
   
    /**
     * 触发本模块消息
     * @param key 唯一标识 {any}
     * @param ...param:any[]
     */
    _proto_.applyFunc = function(key) {
        return this._controller.applyFunc.apply(this._controller, arguments);
    }

    /**
     * 触发其他模块消息
     * @param controllerKey 模块标识 {number}
     * @param key 唯一标识 {any}
     * @param ...param:any[]
     */
    _proto_.applyControllerFunc = function(controllerKey, key) {
        return this._controller.applyControllerFunc.apply(this._controller, arguments);
    }

    /**
     * 子类继承必须实现，赋值加载资源
     * @param [{url: , type: }]
     */
    _proto_.initRes = function(){

    }

    /**
     * 对面板进行显示初始化，用于子类继承
     */
    _proto_.initView = function() {
        
    }

    /**
     * 对面板数据的初始化，用于子类继承
     */
    _proto_.initData = function() {

    }

    /**
     * 面板开启执行函数，用于子类继承
     * @param 场景
     * @param 居中处理
     * @param ...param:any[]
     */
    _proto_.show = function(scene, center){
        (center === void 0) && (center = false);
        //该view界面居中情况        
        if (center) {
            this.x = (App.StageUtils.stageW - this.width) / 2;
            this.y = (App.StageUtils.stageH - this.height) / 2;
        }
        scene.addView(this);
    }

    /**
     * 面板关闭执行函数，用于子类继承
     * @param ...param:any[]
     */
    _proto_.close = function() {
        this.removeSelf();
    }

    /**
     * 屏幕尺寸变化时调用
     */
    _proto_.onResize = function() {

    }

    /**
     * 获取view窗口级别
     */
    _proto_.getLayer = function(){
        return ViewType.LAYER_WINDOW;
    }

    /**
     * 加载面板所需资源
     * @param callback {function}
     * @param thisObj {any}
     */
    _proto_.loadResource = function(callback, thisObj) {
        var self = this;
        if(!self.resouce || self.resouce.length <= 0){
            return;
        }
        App.EasyLoading.show();
        if(!self.isInit){
            App.ResourceUtils.loadResource(self.resouce, function () {
                self.isInit = true;
                self.initView();
                App.EasyLoading.close();
                (callback) && (callback.call(thisObj));
            }, null, self);
        }else{
            App.EasyLoading.close();
            (callback) && (callback.call(thisObj));
        }
    }

    /**
     * 摧毁view
     */
    _proto_.destroy = function(){
        this._isInit = false;
        this._resouce = null;
        this._controller = null;
        App.StageUtils.getStage().off(Laya.Event.RESIZE, this, this.onResize);
        _super_.destroy.call(this);
    }

    /**
     * 添加子对象，如果该view被摧毁不添加
     */
    _proto_.addChild = function(node){
        if(this.destroyed) return;
        _super_.addChild.call(this, node);
    }

    /**
     * 获取设置是否初始化
     */
    _getset_(0, _proto_, "isInit",
        function(){
            return this._isInit;
        },
        function(value){
            this._isInit = value
        }
    );

    /**
     * 获取设置是否初始化
     */
    _getset_(0, _proto_, "resouce",
        function(){
            return this._resouce;
        },
        function(value){
            this._resouce = value
        }
    );

    return BaseView;
}());