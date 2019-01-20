let Dist=25,step=500/3,Xstart=25,Ystart=25;
function MakeBox(Xstart,Ystart,step){
  let Xend=parseInt(Xstart+step*3)
  let Yend=parseInt(Ystart+step*3)
  for(let x=parseInt(Xstart+step),i=0;i<2;i++,x=parseInt(x+step)){
    line(x,Ystart,x,Yend)
  }
  for(let y=parseInt(Ystart+step),i=0;i<2;i++,y=parseInt(y+step)){
    line(Xstart,y,Xend,y)
  }
}
function setup(){
  createCanvas(550,550);
    background(51);
    stroke(182,42,42)
    strokeWeight(8)
    MakeBox(Xstart,Ystart,step)//For Big Box
    //Following loop to display small boxes
    Xstart=Xstart+9;
    Ystart=Ystart+9;
    strokeWeight(4)
    stroke(250,238,238)
    for(let x=Xstart,i=0;i<3;x=parseInt(x+step),i++){
      for(let y=Ystart,j=0;j<3;y=parseInt(y+step),j++){
        MakeBox(x,y,45)
      }
    }
    TotalTrack=new Array(81).fill(0)

    // console.log(TotalTrack[0][0])
}
let BigArray=[[0,0,0],[0,0,0],[0,0,0]];
let TotalTrack=[];

let WhichBox=[0,0]
function GetArray(n){
  let c=[];
  let g=[]
  for(let i=0;i<3;i++){
    for(let j=0;j<3;j++){
      for(let k=0;k<3;k++)
        c[k]=new Array(3).fill(0);
      g[j]=c;
    }
    n[i]=g;

  }
}
function GetCoors(X,Y){
  Xstart=25;
  Ystart=25;
  step=parseInt(500/3)
  var a=[]
  for(let y=Ystart,i=0;i<3;i++,y=parseInt(y+step)){
    if(Y>y && Y<parseInt(y+step)){
      a[0]=i;
      for(let x=Xstart,j=0;j<3;j++,x=parseInt(x+step))
        if(X>x && X<parseInt(x+step)){
          a[1]=j;
          Xstart=parseInt(25+9+j*step);
          Ystart=parseInt(25+9+i*step);
          step=45
          for(let yi=Ystart,l=0;l<3;l++,yi=parseInt(yi+step)){
            if(Y>yi && Y<parseInt(yi+step)){
              a[2]=l;
              for(let xi=Xstart,o=0;o<3;o++,xi=parseInt(xi+step))
                if(X>xi && X<parseInt(xi+step)){
                  a[3]=o;
                  return a;
                }
              }
            }
        }
    }
  }
  return 0;
}
function CheckForSpace(Coors){
  let index=(Coors[0]+Coors[1]*3)*9+Coors[2]+Coors[3]*3;
  if(TotalTrack[index]!=0)
    return 0
  else return 1;
}
function DeleteBox(numY,numX){
  stroke(51,51,51)
  let s=500/3;
  strokeWeight(3)

  let x=numX*s+30,y=numY*s+30;
  line(x,y,x,y+150)
  line(x,y,x+150,y)
  line(x+150,y,x+150,y+150)
  line(x,y+150,x+150,y+150)
  stroke(250,238,238)
  strokeWeight(4)
}
function DisplayBox(numY,numX){
  let s=500/3;
  strokeWeight(1)
  let x=numX*s+30,y=numY*s+30;
  line(x,y,x,y+150)
  line(x,y,x+150,y)
  line(x+150,y,x+150,y+150)
  line(x,y+150,x+150,y+150)
  strokeWeight(4)
}
let prev=[0,0]
function checkIfBoxFilled(Coors){
  let startIndex=(Coors[0]+Coors[1]*3)*9
  for(let x=startIndex;x<startIndex+9;x++)
    if(TotalTrack[x]==0)
      return 0;
  return 1;
}
function NearestEmptyBox(numR,numC){
  //Check For back
  let index=(numR+numC*3)*9
  let i,j
  for(i=index;i>=0;i--){
    if(TotalTrack[i]==0)
      break;
  }

  //Check For front
  for(j=index;j<81;j++){
    if(TotalTrack[j]==0)
      break;
  }
  let found
  ((index-i)>(j-index))?found=j:found=i;
  for(i=0;i<=81;i=i+9)
    if(i+9>found)
      break;
  found=i;
  found=found/9
  let nR,nC;
  let flag=0;
  for(nR=0;nR<2;nR++){
    for(nC=0;nC<2;nC++)
      if(found==nR+nC*3){
        flag=1
        break;
      }
      if(flag=1)break;
  }
  let a=[nR,nC]
  return a;
}
function Display(Coors,Count){
  console.log("hello")
  DeleteBox(prev[0],prev[1])
  let step1=500/3
  let step2=45
  let index=(Coors[0]+Coors[1]*3)*9+Coors[2]+Coors[3]*3;
  let pixelX=parseInt(25+9+Coors[1]*step1+Coors[3]*step2)
  let pixelY=parseInt(25+9+Coors[0]*step1+Coors[2]*step2)
  // console.log(Coors)
  if(Count%2==0){
    //Make a Circle
    ellipse(pixelX+20,pixelY+20,20,20)
    TotalTrack[index]=1
    // TotalTrack[0][0][0][2]=1
  }
  else{
    let x=pixelX+5,y=pixelY+5;
    line(x+10,y+10,x+25,y+25)
    line(x+25,y+10,x+10,y+25)
    TotalTrack[index]=2

  }
  WhichBox[0]=Coors[2];
  WhichBox[1]=Coors[3];
  if(checkIfBoxFilled(WhichBox)==1){
    if(Coors[0]==Coors[2] && Coors[1]==Coors[3]){
      WhichBox=NearestEmptyBox(Coors[0],Coors[1])
      DisplayBox(WhichBox[0],WhichBox[1])
    }
    else{
      WhichBox[0]=Coors[0];
      WhichBox[1]=Coors[1];
      DisplayBox(WhichBox[0],WhichBox[1])
    }
  }
  else{
    DisplayBox(WhichBox[0],WhichBox[1])
    prev=WhichBox;
  }
}
let Count=0;
function checkforwin(arr){
  for(let i=0;i<3;i++){
    if(arr[i][0]==1 && arr[i][1]==1 && arr[i][2]==1){
        return 1;
    }
    if(arr[i][0]==2 && arr[i][1]==2 && arr[i][2]==2){
        return 2;
    }
    if(arr[0][i]==1 && arr[1][i]==1 && arr[2][i]==1){
        return 1;
    }
    if(arr[0][i]==2 && arr[1][i]==2 && arr[2][i]==2){
        return 2;
    }

  }
  if(arr[0][0]==1 && arr[1][1]==1 && arr[2][2]==1){
      return 1;
  }
  if(arr[0][0]==2 && arr[1][1]==2 && arr[2][2]==2){
      return 2;
  }
  if(arr[0][2]==1 && arr[1][1]==1 && arr[2][0]==1){
      return 1;
  }
  if(arr[0][2]==2 && arr[1][1]==2 && arr[2][0]==2){
      return 2;
  }
  return 0;
}
let AlreadyWon=[]
function CrossesWon(){
  t++;
  if(t==1){
    background(51);
  }
  if (mouseIsPressed){
    stroke(255);
  }
  else {
    stroke(237,34,93);
  }
  line(mouseX-50, mouseY+50, mouseX+50, mouseY-50);
  line(mouseX+50, mouseY+50, mouseX-50, mouseY-50);
}
function CirclesWon(){
  t++
  if(t==1)
    background(51);
    if (mouseIsPressed){
      stroke(255);
    }
    else {
      stroke(237,34,93);
    }
    ellipse(mouseX,mouseY,50,50)
}
function someoneWon(Num){
  if(Num==1)
    CirclesWon();
  else CrossesWon();
}
AlreadyWon=new Array(9).fill(0)
function draw(){
  let Won=checkforwin(BigArray)
  if(mouseIsPressed){
    if(Won!=0)
      someoneWon(Won)
    let k=GetCoors(mouseX,mouseY);
    // console.log(k,WhichBox,TotalTrack)
    if(k[0]!=WhichBox[0] || k[1]!=WhichBox[1] || CheckForSpace(k)==0){
      return;
    }
    else{
      let currentBox=[]
      for(let i=0;i<3;i++)
        currentBox[i]=new Array(3)
      for(let i=(k[0]+k[1]*3)*9,j=0;j<3;j++){
        for(let k=0;k<3;k++){
          currentBox[j][k]=TotalTrack[i];
          i++;
        }
      }

      if(checkforwin(currentBox)!=0 && AlreadyWon[k[0]+k[1]*3]==0){
        BigArray[k[0]][k[1]]=checkforwin(currentBox)
        AlreadyWon[k[0]+k[1]*3]=1;
      }
      console.log(BigArray)
      Display(k,Count)
      Count++
      // console.log(Count)
    }
  }
}
