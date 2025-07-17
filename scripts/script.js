const colors=["red","blue","yellow","green","black"];
const objects=["Tshirt","phone","PC","car","battery","choeses"];
const sizes=["small","medium","large"];

function pick_randm_item(arr){
    return arr[Math.floor(Math.random()*arr.length)];
}

async function random_list(){
    return fetch('https://dummyjson.com/products/category-list')
        .then(res => res.json())
            .then(list_items=>{

                let list='<ol>'
                for(let i=0;i<list_items.length;i++){
                    list+=`<li>
                           <a href='.'>${list_items[i]} </a>
                           </li>`
                }
                list+='</ol>'
                console.log(list);
                return list;
        });
}

async function random_object(){
    const param=new URLSearchParams(window.location.search);
    let start=param.get("start");
    let url=""
    if(start){
        url='https://dummyjson.com/products?skip='+start
    }else{
        
        url='https://dummyjson.com/products'
        start=0;

    }

    return fetch(url)
        .then(res => res.json())
        .then(res=>{

            let items="";
            console.log(res.products.length);

            for(let i=0;i<res.products.length;i++){
                items+=`
                    <a href="item.html?product_id=${res.products[i].id}">
                        <div class='shopitem' role='link' >
                            <img src='${res.products[i].images[0]}' width="100">
                            <p>${res.products[i].title}</p>
                        </div>
                    </a>
                `;
            }
            console.log(items);
            return items;
        });

}

async function load_item(){
    const param=new URLSearchParams(window.location.search);
    const id=param.get("product_id");
    
    return fetch('https://dummyjson.com/products/'+id)
    .then(res=>res.json())
}

function change_page(direction){
    const param=new URLSearchParams(window.location.search);

    let start=parseInt(param.get("start"),10);
    if(start){
        if(direction=="next" && start<140)
            start+=30;
        if(direction =="previous" && start>0)
            start-=30;
        window.location.href="index.html?start="+start;
        alert("exists")
    }else{
        window.location.href="index.html?start=30";
    }
    
}
