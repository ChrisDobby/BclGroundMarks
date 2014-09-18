(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,WebSharper,Html,Default,List,T,Operators,GroundMarks,Client,Remoting,Concurrency,Seq,google,visualization,ColumnChart,String,DataTable;
 Runtime.Define(Global,{
  GroundMarks:{
   Client:{
    CaptainTable:function(club)
    {
     var x;
     x=Default.Div(Runtime.New(T,{
      $:0
     }));
     Operators.OnAfterRender(function(container)
     {
      return Client.drawCaptainTable(container,Remoting.Async("GroundMarks:7",[club]));
     },x);
     return x;
    },
    ClubData:function(el,d)
    {
     return Concurrency.Start(Concurrency.Delay(function()
     {
      return Concurrency.Bind(d,function(arg101)
      {
       Seq.iter(Runtime.Tupled(function(cl)
       {
        var arg102;
        arg102=cl[1];
        Operators.add(el,List.ofArray([Operators.add(Default.Div(List.ofArray([Default.Attr().Class("tab-pane"),Default.Attr().NewAttr("id",arg102)])),List.ofArray([Default.Div(List.ofArray([Default.Attr().Class("col-md-12 well lead"),Default.Text(cl[0])])),Operators.add(Default.Div(List.ofArray([Default.Attr().Class("col-md-12")])),List.ofArray([Default.Div(List.ofArray([Default.Attr().Class("lead"),Default.Text("Umpires Pitch")])),Client.UmpirePitchTable(cl[0]),Default.Div(List.ofArray([Default.Attr().Class("lead"),Default.Text("Umpires Outfield")])),Client.UmpireOutfieldTable(cl[0]),Default.Div(List.ofArray([Default.Attr().Class("lead"),Default.Text("Captain")])),Client.CaptainTable(cl[0])]))]))]));
       }),arg101);
       return Concurrency.Return(null);
      });
     }));
    },
    ClubTabs:function(el,d)
    {
     return Concurrency.Start(Concurrency.Delay(function()
     {
      return Concurrency.Bind(d,function(arg101)
      {
       Seq.iter(Runtime.Tupled(function(cl)
       {
        Operators.add(el,List.ofArray([Default.LI(List.ofArray([Default.A(List.ofArray([Default.HRef("#"+cl[1]),Default.Attr().NewAttr("data-toggle","tab"),Default.Text(cl[0])]))]))]));
       }),arg101);
       return Concurrency.Return(null);
      });
     }));
    },
    FirstDivisionOutfieldChart:function()
    {
     var x;
     x=Default.Div(Runtime.New(T,{
      $:0
     }));
     Operators.OnAfterRender(function(container)
     {
      return Client.drawChart(new ColumnChart(container.Body),Client.chartOptions("Division 1 Outfield Marks"),Remoting.Async("GroundMarks:2",[]));
     },x);
     return x;
    },
    FirstDivisionPitchChart:function()
    {
     var x;
     x=Default.Div(Runtime.New(T,{
      $:0
     }));
     Operators.OnAfterRender(function(container)
     {
      return Client.drawChart(new ColumnChart(container.Body),Client.chartOptions("Division 1 Pitch Marks"),Remoting.Async("GroundMarks:0",[]));
     },x);
     return x;
    },
    Main:function()
    {
     var x;
     x=Operators.add(Default.Div(List.ofArray([Default.Attr().Class("tab-content")])),List.ofArray([Operators.add(Default.Div(List.ofArray([Default.Attr().Class("tab-pane active in"),Default.Attr().NewAttr("id","pitch")])),List.ofArray([Operators.add(Default.Div(List.ofArray([Default.Attr().Class("col-md-12")])),List.ofArray([Client.FirstDivisionPitchChart()])),Operators.add(Default.Div(List.ofArray([Default.Attr().Class("col-md-12")])),List.ofArray([Client.SecondDivisionPitchChart()]))])),Operators.add(Default.Div(List.ofArray([Default.Attr().Class("tab-pane"),Default.Attr().NewAttr("id","outfield")])),List.ofArray([Operators.add(Default.Div(List.ofArray([Default.Attr().Class("col-md-12")])),List.ofArray([Client.FirstDivisionOutfieldChart()])),Operators.add(Default.Div(List.ofArray([Default.Attr().Class("col-md-12")])),List.ofArray([Client.SecondDivisionOutfieldChart()]))]))]));
     Operators.OnAfterRender(function(container)
     {
      return Client.ClubData(container,Remoting.Async("GroundMarks:4",[]));
     },x);
     return Operators.add(Default.Div(List.ofArray([Default.Attr().Class("container")])),List.ofArray([Client.Tabs(),x]));
    },
    SecondDivisionOutfieldChart:function()
    {
     var x;
     x=Default.Div(Runtime.New(T,{
      $:0
     }));
     Operators.OnAfterRender(function(container)
     {
      return Client.drawChart(new ColumnChart(container.Body),Client.chartOptions("Division 2 Outfield Marks"),Remoting.Async("GroundMarks:3",[]));
     },x);
     return x;
    },
    SecondDivisionPitchChart:function()
    {
     var x;
     x=Default.Div(Runtime.New(T,{
      $:0
     }));
     Operators.OnAfterRender(function(container)
     {
      return Client.drawChart(new ColumnChart(container.Body),Client.chartOptions("Division 2 Pitch Marks"),Remoting.Async("GroundMarks:1",[]));
     },x);
     return x;
    },
    Tabs:function()
    {
     var x;
     x=Default.UL(List.ofArray([Default.Attr().Class("dropdown-menu"),Default.Attr().NewAttr("id","clubDropdown")]));
     Operators.OnAfterRender(function(container)
     {
      return Client.ClubTabs(container,Remoting.Async("GroundMarks:4",[]));
     },x);
     return Operators.add(Default.UL(List.ofArray([Default.Attr().Class("nav nav-tabs")])),List.ofArray([Operators.add(Default.LI(List.ofArray([Default.Attr().Class("active")])),List.ofArray([Default.A(List.ofArray([Default.HRef("#pitch"),Default.Attr().NewAttr("data-toggle","tab"),Default.Text("Pitch Marks")]))])),Default.LI(List.ofArray([Default.A(List.ofArray([Default.HRef("#outfield"),Default.Attr().NewAttr("data-toggle","tab"),Default.Text("Outfield Marks")]))])),Operators.add(Default.LI(List.ofArray([Default.Attr().Class("dropdown")])),List.ofArray([Operators.add(Default.A(List.ofArray([Default.Attr().Class("dropdown-toggle"),Default.Attr().NewAttr("data-toggle","dropdown"),Default.HRef("#"),Default.Text("Clubs")])),List.ofArray([Default.Span(List.ofArray([Default.Attr().Class("caret")]))])),x]))]));
    },
    UmpireOutfieldTable:function(club)
    {
     var x;
     x=Default.Div(Runtime.New(T,{
      $:0
     }));
     Operators.OnAfterRender(function(container)
     {
      return Client.drawUmpireOutfieldTable(container,Remoting.Async("GroundMarks:6",[club]));
     },x);
     return x;
    },
    UmpirePitchTable:function(club)
    {
     var x;
     x=Default.Div(Runtime.New(T,{
      $:0
     }));
     Operators.OnAfterRender(function(container)
     {
      return Client.drawUmpirePitchTable(container,Remoting.Async("GroundMarks:5",[club]));
     },x);
     return x;
    },
    captainRows:function(d)
    {
     return Seq.map(function(m)
     {
      return Default.TR(List.ofArray([Default.TD(List.ofArray([Default.Text(m.MatchDate)])),Default.TD(List.ofArray([Default.Text(String(m.Pitch))])),Default.TD(List.ofArray([Default.Text(String(m.Outfield))])),Default.TD(List.ofArray([Default.Text(String(m.Changing))])),Default.TD(List.ofArray([Default.Text(String(m.Scoreboard))]))]));
     },d);
    },
    chartOptions:function(t)
    {
     var returnVal,returnVal1;
     returnVal={};
     returnVal.minValue=0;
     returnVal.maxValue=5;
     returnVal1={};
     returnVal1.showTextEvery=1;
     returnVal1.slantedText=true;
     returnVal1.slantedTextAngle=50;
     return{
      width:800,
      height:340,
      vAxis:returnVal,
      hAxis:returnVal1,
      backgroundColor:"transparent",
      title:t
     };
    },
    drawCaptainTable:function(el,d)
    {
     return Concurrency.Start(Concurrency.Delay(function()
     {
      return Concurrency.Bind(d,function(arg101)
      {
       Operators.add(el,List.ofArray([Operators.add(Default.Table(List.ofArray([Default.Attr().Class("table table-hover")])),List.ofArray([Default.THead(List.ofArray([Default.TR(List.ofArray([Default.TH(List.ofArray([Default.Text("Match Date")])),Default.TH(List.ofArray([Default.Text("Pitch")])),Default.TH(List.ofArray([Default.Text("Outfield")])),Default.TH(List.ofArray([Default.Text("Changing Rooms")])),Default.TH(List.ofArray([Default.Text("Scoreboard")]))]))])),Operators.add(Default.TBody(Runtime.New(T,{
        $:0
       })),Client.captainRows(arg101))]))]));
       return Concurrency.Return(null);
      });
     }));
    },
    drawChart:function(v,o,d)
    {
     return Concurrency.Start(Concurrency.Delay(function()
     {
      return Concurrency.Bind(d,function(arg101)
      {
       var chartData;
       chartData=new DataTable();
       chartData.addColumn("string","Club");
       chartData.addColumn("number","Umpires");
       chartData.addColumn("number","Captain");
       chartData.addRows(Seq.length(arg101));
       Seq.iteri(function(i)
       {
        return function(m)
        {
         chartData.setCell(i,0,m.Club);
         chartData.setCell(i,1,m.UmpiresMark);
         chartData.setCell(i,2,m.CaptainsMark);
         return;
        };
       },arg101);
       v.draw(chartData,o);
       return Concurrency.Return(null);
      });
     }));
    },
    drawUmpireOutfieldTable:function(el,d)
    {
     return Concurrency.Start(Concurrency.Delay(function()
     {
      return Concurrency.Bind(d,function(arg101)
      {
       Operators.add(el,List.ofArray([Operators.add(Default.Table(List.ofArray([Default.Attr().Class("table table-hover")])),List.ofArray([Default.THead(List.ofArray([Default.TR(List.ofArray([Default.TH(List.ofArray([Default.Text("Match Date")])),Default.TH(List.ofArray([Default.Text("Unevenness")])),Default.TH(List.ofArray([Default.Text("Appearance")])),Default.TH(List.ofArray([Default.Text("Boundary Markings")])),Default.TH(List.ofArray([Default.Text("Sight Screens")]))]))])),Operators.add(Default.TBody(Runtime.New(T,{
        $:0
       })),Client.outfieldRows(arg101))]))]));
       return Concurrency.Return(null);
      });
     }));
    },
    drawUmpirePitchTable:function(el,d)
    {
     return Concurrency.Start(Concurrency.Delay(function()
     {
      return Concurrency.Bind(d,function(arg101)
      {
       Operators.add(el,List.ofArray([Operators.add(Default.Table(List.ofArray([Default.Attr().Class("table table-hover")])),List.ofArray([Default.THead(List.ofArray([Default.TR(List.ofArray([Default.TH(List.ofArray([Default.Text("Match Date")])),Default.TH(List.ofArray([Default.Text("Unevenness")])),Default.TH(List.ofArray([Default.Text("Seam Movement")])),Default.TH(List.ofArray([Default.Text("Carry and Bounce")])),Default.TH(List.ofArray([Default.Text("Turn")]))]))])),Operators.add(Default.TBody(Runtime.New(T,{
        $:0
       })),Client.pitchRows(arg101))]))]));
       return Concurrency.Return(null);
      });
     }));
    },
    outfieldRows:function(d)
    {
     return Seq.map(function(m)
     {
      return Default.TR(List.ofArray([Default.TD(List.ofArray([Default.Text(m.MatchDate)])),Default.TD(List.ofArray([Default.Text(String(m.Unevenness))])),Default.TD(List.ofArray([Default.Text(String(m.Appearance))])),Default.TD(List.ofArray([Default.Text(String(m.Markings))])),Default.TD(List.ofArray([Default.Text(String(m.Screens))]))]));
     },d);
    },
    pitchRows:function(d)
    {
     return Seq.map(function(m)
     {
      return Default.TR(List.ofArray([Default.TD(List.ofArray([Default.Text(m.MatchDate)])),Default.TD(List.ofArray([Default.Text(String(m.Inconsistency))])),Default.TD(List.ofArray([Default.Text(String(m.Seam))])),Default.TD(List.ofArray([Default.Text(String(m.Carry))])),Default.TD(List.ofArray([Default.Text(String(m.Turn))]))]));
     },d);
    }
   },
   Controls:{
    EntryPoint:Runtime.Class({
     get_Body:function()
     {
      return Client.Main();
     }
    })
   }
  }
 });
 Runtime.OnInit(function()
 {
  WebSharper=Runtime.Safe(Global.IntelliFactory.WebSharper);
  Html=Runtime.Safe(WebSharper.Html);
  Default=Runtime.Safe(Html.Default);
  List=Runtime.Safe(WebSharper.List);
  T=Runtime.Safe(List.T);
  Operators=Runtime.Safe(Html.Operators);
  GroundMarks=Runtime.Safe(Global.GroundMarks);
  Client=Runtime.Safe(GroundMarks.Client);
  Remoting=Runtime.Safe(WebSharper.Remoting);
  Concurrency=Runtime.Safe(WebSharper.Concurrency);
  Seq=Runtime.Safe(WebSharper.Seq);
  google=Runtime.Safe(Global.google);
  visualization=Runtime.Safe(google.visualization);
  ColumnChart=Runtime.Safe(visualization.ColumnChart);
  String=Runtime.Safe(Global.String);
  return DataTable=Runtime.Safe(visualization.DataTable);
 });
 Runtime.OnLoad(function()
 {
  return;
 });
}());
