(function (window) {
    'use strict';

    function defineLibrary() {
        var ResizeJs = {};
        var rsCollection = [];
        
        class Handle{
            constructor(parent, position){
                this.parent = parent;
                this.elem = document.createElement('div');
                this.elem.setAttribute('draggable', 'true');
                this.elem.className = "handles " + position+"-handle";
                parent.appendChild(this.elem);
                
                this.moving = false;
                this.offsetX = 0;
                this.offsetY = 0;
                this.parentHeight = this.parent.style.height;
                this.parentWidth = this.parent.style.width;
                
                this.elem.addEventListener("dragstart", ev => this.dragstart(ev), false);
                this.elem.addEventListener("drag", ev => this.drag(ev), false);
                this.elem.addEventListener("dragend", ev => this.dragend(ev), false);
                
            }
            
            n(ev){
                this.parent.style.top = ev.clientY +'px';
                this.parent.style.height = this.parentHeight - (ev.clientY - this.offsetY) +'px';
            }
            
            s(ev){
                this.parent.style.height = ev.clientY - this.parent.offsetTop +'px';
            }
            
            e(ev){
                this.parent.style.width = ev.clientX - this.parent.offsetLeft +'px';
            }
            
            w(ev){
                this.parent.style.width = this.offsetX - ev.clientX + this.parentWidth +'px';
                this.parent.style.left = ev.clientX +'px';
            }
            
            setDirection(ev){
                switch (ev.target.className){
                    case 'handles nw-handle':
                        this.n(ev);
                        this.w(ev);
                        break;

                    case 'handles n-handle':
                        this.n(ev);
                        break;

                    case 'handles ne-handle':
                        this.n(ev);
                        this.e(ev);
                        break;

                    case 'handles e-handle':
                        this.e(ev);
                        break;

                    case 'handles se-handle':
                        this.s(ev);
                        this.e(ev);
                        break;

                    case 'handles s-handle':
                        this.s(ev);
                        break;

                    case 'handles sw-handle':
                        this.s(ev);
                        this.w(ev);
                        break;

                    case 'handles w-handle':
                        this.w(ev);
                        break;
                }
            }
            
            dragstart(ev){
                ev.stopPropagation();
                this.elem.style.opacity = 0;
                this.moving = true;
                this.parentHeight = this.parent.clientHeight;
                this.parentWidth = this.parent.clientWidth;
                this.offsetX = this.parent.offsetLeft;
                this.offsetY = this.parent.offsetTop;
            }
            
            drag(ev){
                ev.stopPropagation();
                if(this.moving)
                {                    
                    this.setDirection(ev);
                }
            }
            
            dragend(ev){
                ev.stopPropagation();
                                
                // This replace the handle at the right position
                this.elem.style = '';
                this.elem.style.opacity = 1;
                this.elem.style.display = 'block';
                
                this.moving = false;
                
                this.setDirection(ev);
            }
        }
        
        class Resizable{
            
            constructor(elem){
                this.elem = elem;
                this.elem.className += " resizable";
                this.elem.setAttribute('draggable', 'true');
                this.elem.style.position = 'absolute';
                
                this.selected = false;
                this.moving = false;
                this.offsetX = 0;
                this.offsetY = 0;
                this.x = 0;
                this.y = 0;
                
                this.elem.addEventListener("mousedown", ev => this.select(ev), false);
                this.elem.addEventListener("dragstart", ev => this.dragstart(ev), false);
                this.elem.addEventListener("drag", ev => this.drag(ev), false);
                this.elem.addEventListener("dragend", ev => this.dragend(ev), false);
                
                this.handles = ['n', 'ne', 'nw', 'w', 'e', 's', 'sw', 'se'];
                
                for(var i=0, length=this.handles.length; i<length; i++){
                    var handle = new Handle(this.elem, this.handles[i]);   
                }
            }
            
            /**
             * Select a Resizable object
             */
            select(ev){
                
                // First we need to deselect other selected items
                for(var item of rsCollection){
                    item.deselect();
                }
                
                this.selected = true;
                
                this.elem.style.border = "solid 1px dodgerblue";
                this.elem.style.zIndex = 1;
                
                var handles = this.elem.getElementsByClassName('handles');
                for(var each of handles){
                    each.style.display = 'block';
                }
            }
            
            /**
             * Unselect a Resizable object
             */
            deselect(){
                this.selected = false;
                
                this.elem.style.border = "none";
                this.elem.style.zIndex = 0;
                
                var handles = this.elem.getElementsByClassName('handles');
                for(var each of handles){
                    each.style.display = 'none';
                }
            }
            
            dragstart(ev){
                ev.stopPropagation();
                this.select(ev);
                this.moving = true;
                this.offsetX = ev.clientX - ev.target.offsetLeft;
                this.offsetY = ev.clientY - ev.target.offsetTop;
            }
            
            drag(ev){
                ev.stopPropagation();
                if(this.moving)
                {
                    ev.target.style.left = ev.clientX - this.offsetX + 'px';
                    ev.target.style.top = ev.clientY - this.offsetY + 'px';
                }
            }
            
            /**
             * set the moving property to false
             * @param {event} ev dragend event
             */
            dragend(ev){
                ev.stopPropagation();
                this.moving = false;
                ev.target.style.left = ev.clientX - this.offsetX + 'px';
                ev.target.style.top = ev.clientY - this.offsetY + 'px';
            }
        }
        
        
        
        
        /**
         * Get a dom element and transform it into a Resizable Object
         * @param   {String} selector The id of an dom element
         * @returns {Resizable} array of instances of Resizable
         */
        ResizeJs.apply = function (selector) {
            var els = document.querySelectorAll(selector);
            for (var item of els) {
                rsCollection.push( new Resizable(item) );
            }
            
            return rsCollection;
        }
        
        
        window.addEventListener("load", function(){
            document.addEventListener('click', function(ev){
                
                var reg = new RegExp('resizable|handles')
                if(!reg.test(ev.target.className)){
                    for(var item of rsCollection){
                        item.deselect();
                    }
                }
                
            }, false)
        });
        
        
        
        return ResizeJs;
    }
    
    
    
    //define globally if it doesn't already exist
    if (typeof (ResizeJs) === 'undefined') {
        window.ResizeJs = defineLibrary();
    } else {
        console.log("Library already defined.");
    }
    
})(window);