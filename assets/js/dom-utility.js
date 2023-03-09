
function sendHttpRequest(url,data) { 
    // var laoder = new Loader();
    //     laoder.showLoader();
    return new Promise(resolve=>{
        let reqData = data;
        reqData.delete('token');
        reqData.append('token',localStorage.getItem('token'));
        $.ajax({
            type: "POST",
            url: host+url,
            data: reqData,
            processData: false,
            contentType:false,
            timeout: 600000,
            success: function (response) {
                resolve(response);
                laoder.hideLoader();
                if(reqData.get('act') !== 'srch' && reqData.get('act') !== '' && reqData.get('act') !== 'getall'){
                    if(response.Result === 'OK'){
                        if(response.Msg){

                            Alert("success",'Success :)',response.Msg)
                        }
                    }else{
                        Alert("error",'Something Went Wrong !',response.Msg)
                    }
                }
            },
            error: function(response){
                resolve(response);
                laoder.hideLoader();
            }
        });
    })
}


function PageLaod(pageId){
    return new Promise((resolve,reject)=>{
        $("#main-content-wrapper").load(`./pages/${pageId}.html`);
        resolve();
    })
}

async function switchPageSetup(pageId){
    $(".switch-next").click(()=>{
        var filterValues = filterValueHandler('get');
        PageSwitcher__handler(pageId,filterValues.comId,filterValues.depId)
    });

}

async function PageSwitcher__handler(pageId,comId,depId){
    $(".nav-time").removeClass('selected');

    dataRemover()
    
    document.querySelector(`#${pageId}`).dataset.comId = comId;
    document.querySelector(`#${pageId}`).dataset.depId = depId;
    
    $(`#${pageId}`).addClass('selected');
    

    await PageLaod($(`#${pageId}`).data('page-link'))

}

function filterValueHandler(action,pageLinkId){
    switch(action){
        case 'set':
            var linkId = document.querySelector(`#${pageLinkId}`);

            if(linkId.dataset.comId && linkId.dataset.depId){
              setTimeout(()=>{
                console.log("Called");
                $("#commodity-seletor").val(linkId.dataset.comId); 
                $("#department-seletor").val(linkId.dataset.depId); 
              },2000)
            }
        break;
        case 'get':
            var commodity   = $("#commodity-seletor");
            var department  = $("#department-seletor");
            return {
                comId:commodity.val(),
                depId:department.val()
            }
        break;
    }
}

function dataRemover(){
    document.querySelectorAll(".nav-time").forEach((element)=>{  
        delete element.dataset.comId;
        delete element.dataset.depId;
    });
}