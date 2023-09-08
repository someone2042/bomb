const size = 10;//size of the main matrix
const m = new Array(size);//the main matrix
const bomb_nb=10;//number of bombs in the matrix
let begain=true;
let fuck_this=0;

for (let i = 0; i < size; i++) {
  m[i] = new Array(size);
}
for(let i=0;i<size;i++)
    {
        for(let j=0;j<size;j++)
        {
            m[i][j]={
                reserve:false,
                open:false,
                value:' ',
                flag:false
            };
        }
    }



//this function write the number of bombs around a squar
function writeMatrix()
{
    for(let i=0;i<size;i++)
    {
        for(let j=0;j<size;j++)
        {
            if(m[i][j].value!='X')
            {
                let cont=0;
    
                if(i!=0&& j!=0&& m[i-1][j-1].value=='X')
                {
                    cont++;
                }
                if(i!=0&& m[i-1][j].value=='X')
                {
                    cont++;
                }
                if(i!=0&& j!=size-1 && m[i-1][j+1].value=='X')
                {
                    cont++;
                }
                if( j!=0&& m[i][j-1].value=='X')
                {
                    cont++;
                }
                if(j!=size-1 && m[i][j+1].value=='X')
                {
                    cont++;
                }
                if(i!=size-1 &&  j!=0&& m[i+1][j-1].value=='X')
                {
                    cont++;
                }
                if(i!=size-1 && m[i+1][j].value=='X')
                {
                    cont++;
                }
                if(i!=size-1 && j!=size-1 && m[i+1][j+1].value=='X')
                {
                    cont++;
                }
                m[i][j].value=cont;
            }
    
        }
    }
}

//fill the matrix with the bomb position
function fill()
{
    let i= Math.floor(Math.random() * (size));
    let j= Math.floor(Math.random() * (size));
    if(m[i][j].value=='X'||m[i][j].reserve==true)
    {
        fill();
    }
    else
    {
        if(m[i][j].reserve==false)
        {
            m[i][j].value='X';
            m[i][j].open=false;
        }
    }
}
//building the bord
document.addEventListener('DOMContentLoaded', function () {
    let main = document.getElementById('main');
    for(let i=0;i<size;i++)
    {
        let tr=document.createElement('tr');
        for(let j=0;j<size;j++)
        {
            let td=document.createElement('td');
            let img=document.createElement('img');
            img.setAttribute('src','icons8-flag-filled-48.png');
            td.setAttribute('id',i*size+j);
            td.setAttribute('onclick','pressReel('+td.id+'),press('+td.id+')');
            td.setAttribute('class','td');
            td.addEventListener("contextmenu", (e) => {
                e.preventDefault();
                if(m[i][j].flag==false)
                {
                    let img=document.createElement('img');
                    img.setAttribute('src','icons8-flag-filled-48.png');
                    td.appendChild(img);
                    m[i][j].flag=true;
                }
                else
                {
                    td.removeChild(td.firstChild);
                    m[i][j].flag=false;
                }
            });
            td.style.height=(1/size)*100+"%"
            tr.appendChild(td);
        }
        main.appendChild(tr);
    }
});
function press(id)
{
    let i=Math.floor(id/size);
    let j=id%size;
    if(i>size-1||i<0||j>size-1||j<0){return;}
    if(m[i][j].open==true){return;}
    if(begain)
    {
        firstClick(i,j);
    }
    else
    {
        if(m[i][j].value=='X')
        {
            document.getElementById(id).innerText=m[i][j].value;
            document.getElementById(id).classList.remove('td');
            document.getElementById(id).classList.add('open');
            window.alert('game over !!')
            
        }
        else
        {
            if(m[i][j].value==0)
            {
                m[i][j].open=true;
                document.getElementById(id).innerText=' ';
                document.getElementById(id).classList.remove('td');
                document.getElementById(id).classList.add('open');
                pressAround(i,j);
            }
            else
            {
                m[i][j].open=true;
                document.getElementById(id).innerText=m[i][j].value;
                document.getElementById(id).classList.remove('td');
                document.getElementById(id).classList.add('open');
                if(m[i][j].value==1){document.getElementById(id).style.color='blue';}
                if(m[i][j].value==2){document.getElementById(id).style.color='green';}
                if(m[i][j].value==3){document.getElementById(id).style.color='red';}
                if(m[i][j].value==4){document.getElementById(id).style.color='purple';}
                if(m[i][j].value==5){document.getElementById(id).style.color='orange';}
            }
        }
    }
}
function pressAround(i,j)
{
    if(i-1>=0&&j+1<=size-1&&m[i-1][j+1].open==false&&m[i-1][j+1].flag==false)
    {
        press((i-1)*size+j+1)  
    }
    if(i-1>=0&&m[i-1][j].open==false&&m[i-1][j].flag==false)
    {
        press((i-1)*size+j)

    }
    if(j+1<=size-1&&m[i][j+1].open==false&&m[i][j+1].flag==false)
    {
        press((i)*size+j+1)

    }
    if(i+1<=size-1&&m[i+1][j].open==false&&m[i+1][j].flag==false)
    {
        press((i+1)*size+j)
        
    }
    if(j-1>=0&&i+1<=size-1&&m[i+1][j-1].open==false&&m[i+1][j-1].flag==false)
    {
        press((i+1)*size+j-1)

    }
    if(j-1>=0&&m[i][j-1].open==false&&m[i][j-1].flag==false)
    {
        press((i)*size+j-1)

    }
    if(j-1>=0&&i-1>=0&&m[i-1][j-1].open==false&&m[i-1][j-1].flag==false)
    {
        press((i-1)*size+j-1)
    }
    if(i+1<=size-1&&j+1<=size-1&&m[i+1][j+1].open==false&&m[i+1][j+1].flag==false)
    {
        press((i+1)*size+j+1)
    }
}
function firstClick(i,j)
{
    begain=false;
    let nHorisontal=1;
    let nVertical=1
    let rs=0;
    let ls=0;
    let us=0;
    let ds=0;
    while(nHorisontal<5)
    {
        if(j-ls>0)
        {
            nHorisontal++;
            ls++;
        }
        if(j+rs<size-1)
        {
            nHorisontal++;
            rs++;
        }
    }
    while(nVertical<5)
    {
        if(i-us>0)
        {
            nVertical++;
            us++;
        }
        if(i+ds<size-1)
        {
            nVertical++;
            ds++;
        }
    }
    for(let k=i-us;k<i+ds;k++)
    {
        for(let l=j-ls;l<j+rs;l++)
        {
            m[k][l].reserve=true
        }
    }
    for(let i=0;i < bomb_nb;i++)
    {
        fill();
    }
    writeMatrix();
    for(let k=i-us;k<i+ds;k++)
    {
        for(let l=j-ls;l<j+rs;l++)
        {
            press(k*size+l)
        }
    }

}
function pressReel(id)
{
    let i=Math.floor(id/size);
    let j=id%size;
    if(m[i][j].open==false){return;}
    pressAround(i,j);
}