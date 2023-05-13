const logout=document.getElementById('logout');
const home=document.getElementById('home');
const blogPagination=document.getElementById('blog-pagination');
const blogsByAuthor=document.getElementById('auth-blogs-container');
const parent_element=document.querySelector('body');


const token=localStorage.getItem('token');

window.addEventListener('DOMContentLoaded',(e)=>{
    e.preventDefault()
    const page=1;
    getBlogsByAuth(page)
});

home.addEventListener('click',(e)=>{
    e.preventDefault()
    window.location.href='/home.html'
});

logout.addEventListener('click',(e)=>{
    e.preventDefault()
    window.location.href='/login.html'
});


const getBlogsByAuth=function(page){
    axios({
        method:'get',
        url: `http://localhost:8080/blog/getauthblog?page=${page}`,
        headers:{'Authorization':token}
    })
    .then(res=>{
        if(res.data.Blogs!=undefined){
            document.getElementById('auth-detail').textContent=`Blogs by you`
            res.data.Blogs.forEach(element => {
                var li = document.createElement('li');
                li.className='blog-item';
                const title=element.title.split(' ').map(item=>{
                    return item.slice(0,1).toUpperCase()+item.slice(1)
                }).join(' ');
                const author=element.author.split(' ').map(item=>{
                    return item.slice(0,1).toUpperCase()+item.slice(1)
                }).join(' ');
                li.innerHTML=`<a class="blogs" id="blog${element.id}">"${title}"  </a>`;
                
                var deleteBlog=document.createElement('button');
                deleteBlog.className='dlt';
                deleteBlog.textContent='Delete Blog';
                deleteBlog.style.border='solid 2px red';

                var editBlog=document.createElement('button');
                editBlog.className='edt';
                editBlog.textContent='Edit Blog';
                editBlog.style.border='solid 2px green';

                li.id=element.id
                li.appendChild(deleteBlog);
                li.appendChild(editBlog);
                blogsByAuthor.appendChild(li);
                });
                pagination(res.data.currentPage,res.data.hasNextPage,res.data.nextPage,res.data.hasPreviousPage,res.data.previousPage,blogPagination)
        }
    })
    .catch(err=>{
        console.log(err)
        if (err.response.status === 404) {
            alert(err.response.data.message);
        } else if (err.response.status === 500) {
            alert(err.response.data.message);
        }
    })
};

parent_element.addEventListener('click',(e)=>{
    e.preventDefault()
    if(e.target.className==='dlt'){
        // console.log(e.target.parentNode.id)
        removeExpense(e.target.parentNode.id)
    }else if(e.target.className==='edt'){
        localStorage.setItem('blogId',e.target.parentNode.id)
        window.location.href='/editblog.html'
    }
});

function removeExpense(blogId){
    axios({
        method:'delete',
        url:`http://localhost:8080/blog/deleteblog?blogId=${blogId}`,  
    }).then(res=>console.log(res)).catch(err=>console.log(err))
};


// function editExpDetails(blogId){
//     axios({
//         method:'patch',
//         url:`http://localhost:8080/blog/editblog?blogId=${blogId}`,
//         data:{

//         }
//     }).then(res=>console.log(res)).catch(err=>console.log(err))
// };


function pagination(currentPage,hasNextPage,nextPage,hasPreviousPage,previousPage,pages){
    pages.innerHTML='';
    if (hasPreviousPage){
        const prevBtn=document.createElement('button')
        prevBtn.innerHTML=previousPage;
        pages.appendChild(prevBtn);
        prevBtn.addEventListener('click',()=>{
            getBlogsByAuth(previousPage)
            });
    };
    
    const curBtn=document.createElement('button')
    curBtn.innerHTML=currentPage;
    pages.appendChild(curBtn);
    curBtn.addEventListener('click',(e)=>{        
        getBlogsByAuth(currentPage)
    });

    if (hasNextPage){
        const nexBtn=document.createElement('button')
        nexBtn.innerHTML=nextPage;
        pages.appendChild(nexBtn);
        nexBtn.addEventListener('click',()=>{
            getBlogsByAuth(nextPage)
            });
    };
};