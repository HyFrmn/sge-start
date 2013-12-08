define([
    'sge'
    ],
    function(sge){

        var GfxComp = sge.Component.extend({
            register: function(state){
                this._super(state);
                this.actor = new CAAT.ShapeActor().setSize(32,32).setFillStyle('red').setShape(CAAT.ShapeActor.SHAPE_CIRCLE);
                this.entity.get('xform.container').addChild(this.actor);
                state.input.addListener('tap', this.fire.bind(this));
                this.red=true;
            },
            fire: function(){
                if (this.red){
                    this.actor.setFillStyle('yellow')
                    this.red = false;
                } else {
                    this.actor.setFillStyle('red')
                    this.red = true;
                }
                
            }
        })
        sge.Component.register('gfx', GfxComp);

        var MyGameState = sge.GameState.extend({
            initState: function(){
                var pc = new sge.Entity({
                    xform: {
                        tx: 100,
                        ty: 100
                    },
                    controls: {},
                    movement: {},
                    gfx: {}
                })
                this.addEntity(pc);
                setTimeout(function(){
                    this.game.fsm.finishLoad();
                }.bind(this), 1000)
            },
            tick: function(delta){



                //XForm
                for (var i = this._entity_ids.length - 1; i >= 0; i--) {
                    var id = this._entity_ids[i];
                    var e = this.getEntity(id);
                    var tx = e.get('xform.tx');
                    var ty = e.get('xform.ty');
                    var vx = e.get('xform.vx') * delta;
                    var vy = e.get('xform.vy') * delta;
                    e.set('xform.t', tx+vx,ty+vy);
                    e.tick(delta);
                };


                //Draw Function with Sorting
                var sortMap = []
                _.each(this._entity_ids, function(id){
                    if (this.entities[id].active){
                        var entity = this.entities[id];
                        var tx = entity.get('xform.tx');
                        var ty = entity.get('xform.ty');
                        
                        entity.componentCall('render', this.game.renderer, 'main');
                        sortMap.push([entity, ty]);
                    }
                }.bind(this));
                sortMap.sort(function(a,b){return a[1]-b[1]});
                var i = 0;
                sortMap.forEach(function(data){
                    i++;
                    this.scene.setZOrder(data[0].get('xform.container'), i);
                }.bind(this));
            }
        });

        return MyGameState;
    }
)