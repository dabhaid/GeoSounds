function AudioPipelines(bufferList, context)
{
    this.pipeList = new Array();
    this.length = bufferList.length;
    for (var i = 0; i< this.length; i++){
	this.pipeList['audio_'+i] = context.createBufferSource();
	this.pipeList['audio_'+i].buffer = bufferList[i];
	this.pipeList['volume_'+i] = context.createGainNode();
	this.pipeList['audio_'+i].connect(this.pipeList['volume_'+i]);
	this.pipeList['volume_'+i].connect(context.destination);
    }
}
