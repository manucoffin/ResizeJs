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
                console.log("drag CHILD")
                ev.stopPropagation();
                if(this.moving)
                {
                    var newWidth = 0, newHeight = 0, parentOffsetX = 0, parentOffsetY = 0;
                    
                    switch (ev.target.className){
                        case 'handles nw-handle':
                            this.parent.style.width = this.offsetX - ev.clientX + this.parentWidth +'px';
                            this.parent.style.height = this.offsetY - ev.clientY + this.parentHeight +'px';
                            this.parent.style.top = ev.clientY +'px';
                            this.parent.style.left = ev.clientX +'px';
                            break;
                            
                        case 'handles n-handle':
                            this.parent.style.top = ev.clientY +'px';
                            this.parent.style.height = this.parentHeight - (ev.clientY - this.offsetY) +'px';
                            break;
                            
                        case 'handles ne-handle':
                            this.parent.style.height = this.offsetY - ev.clientY + this.parentHeight +'px';
                            this.parent.style.width = ev.clientX - this.offsetX +'px';
                            this.parent.style.top = ev.clientY +'px';
                            break;
                            
                        case 'handles e-handle':
                            this.parent.style.width = ev.clientX - this.parent.offsetLeft +'px';
                            break;
                            
                        case 'handles se-handle':
                            this.parent.style.height = ev.clientY - this.parent.offsetTop +'px';
                            this.parent.style.width = ev.clientX - this.parent.offsetLeft +'px';
                            break;
                            
                        case 'handles s-handle':
                            this.parent.style.height = ev.clientY - this.parent.offsetTop +'px';
                            break;
                            
                        case 'handles sw-handle':
                            this.parent.style.height = ev.clientY - this.parent.offsetTop +'px';
                            this.parent.style.width = this.offsetX - ev.clientX + this.parentWidth +'px';
                            this.parent.style.left = ev.clientX +'px';
                            break;
                            
                        case 'handles w-handle':
                            this.parent.style.width = this.offsetX - ev.clientX + this.parentWidth +'px';
                            this.parent.style.left = ev.clientX +'px';
                            break;
                    }
                }
            }
            
            dragend(ev){
                ev.stopPropagation();
                                
                // This replace the handle at the right position
                this.elem.style = '';
                this.elem.style.opacity = 1;
                this.elem.style.display = 'block';
                
                this.moving = false;
                
                
                switch (ev.target.className){
                    case 'handles nw-handle':
                        this.parent.style.width = this.offsetX - ev.clientX + this.parentWidth +'px';
                        this.parent.style.height = this.offsetY - ev.clientY + this.parentHeight +'px';
                        this.parent.style.top = ev.clientY +'px';
                        this.parent.style.left = ev.clientX +'px';
                        break;

                    case 'handles n-handle':
                        this.parent.style.top = ev.clientY +'px';
                        this.parent.style.height = this.parentHeight - (ev.clientY - this.offsetY) +'px';
                        break;

                    case 'handles ne-handle':
                        this.parent.style.height = this.offsetY - ev.clientY + this.parentHeight +'px';
                        this.parent.style.width = ev.clientX - this.offsetX +'px';
                        this.parent.style.top = ev.clientY +'px';
                        break;

                    case 'handles e-handle':
                        this.parent.style.width = ev.clientX - this.parent.offsetLeft +'px';
                        break;

                    case 'handles se-handle':
                        this.parent.style.height = ev.clientY - this.parent.offsetTop +'px';
                        this.parent.style.width = ev.clientX - this.parent.offsetLeft +'px';
                        break;

                    case 'handles s-handle':
                        this.parent.style.height = ev.clientY - this.parent.offsetTop +'px';
                        break;

                    case 'handles sw-handle':
                        this.parent.style.height = ev.clientY - this.parent.offsetTop +'px';
                        this.parent.style.width = this.offsetX - ev.clientX + this.parentWidth +'px';
                        this.parent.style.left = ev.clientX +'px';
                        break;

                    case 'handles w-handle':
                        this.parent.style.width = this.offsetX - ev.clientX + this.parentWidth +'px';
                        this.parent.style.left = ev.clientX +'px';
                        break;
                }
            }
        }
        
        class Resizable{
            
            constructor(elem){
                this.elem = elem;
                this.elem.className += " resizable";
                
                this.selected = false;
                this.moving = false;
                this.offsetX = 0;
                this.offsetY = 0;
                this.x = 0;
                this.y = 0;
                
                this.elem.addEventListener("click", ev => this.select(ev), false);
                this.elem.addEventListener("dragstart", ev => this.dragstart(ev), false);
                this.elem.addEventListener("drag", ev => this.drag(ev), false);
                this.elem.addEventListener("dragend", ev => this.dragend(ev), false);
                
                this.nHandle = new Handle(this.elem, 'n');
                this.neHandle = new Handle(this.elem, 'ne');
                this.nwHandle = new Handle(this.elem, 'nw');
                this.wHandle = new Handle(this.elem, 'w');
                this.eHandle = new Handle(this.elem, 'e');
                this.sHandle = new Handle(this.elem, 's');
                this.swHandle = new Handle(this.elem, 'sw');
                this.seHandle = new Handle(this.elem, 'se');
                
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