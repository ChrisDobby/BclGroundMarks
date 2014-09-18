declare module GroundMarks {
    module Skin {
        interface Page {
            Title: string;
            Body: __ABBREV.__List.T<any>;
        }
    }
    module Controls {
        interface EntryPoint {
            get_Body(): __ABBREV.__Html.IPagelet;
        }
    }
    module Client {
        var chartOptions : {
            (t: string): __ABBREV.__Visualization.ColumnChartOptions;
        };
        var drawChart : {
            (v: __ABBREV.__visualization.ColumnChart, o: __ABBREV.__Visualization.ColumnChartOptions, d: any): void;
        };
        var pitchRows : {
            (d: __ABBREV.__WebSharper.seq<any>): __ABBREV.__WebSharper.seq<__ABBREV.__Html.Element>;
        };
        var outfieldRows : {
            (d: __ABBREV.__WebSharper.seq<any>): __ABBREV.__WebSharper.seq<__ABBREV.__Html.Element>;
        };
        var captainRows : {
            (d: __ABBREV.__WebSharper.seq<any>): __ABBREV.__WebSharper.seq<__ABBREV.__Html.Element>;
        };
        var drawUmpirePitchTable : {
            <_M1>(el: __ABBREV.__Html.Element, d: any): void;
        };
        var drawUmpireOutfieldTable : {
            <_M1>(el: __ABBREV.__Html.Element, d: any): void;
        };
        var drawCaptainTable : {
            <_M1>(el: __ABBREV.__Html.Element, d: any): void;
        };
        var UmpirePitchTable : {
            (club: string): __ABBREV.__Html.Element;
        };
        var UmpireOutfieldTable : {
            (club: string): __ABBREV.__Html.Element;
        };
        var CaptainTable : {
            (club: string): __ABBREV.__Html.Element;
        };
        var FirstDivisionPitchChart : {
            (): __ABBREV.__Html.Element;
        };
        var SecondDivisionPitchChart : {
            (): __ABBREV.__Html.Element;
        };
        var FirstDivisionOutfieldChart : {
            (): __ABBREV.__Html.Element;
        };
        var SecondDivisionOutfieldChart : {
            (): __ABBREV.__Html.Element;
        };
        var ClubTabs : {
            (el: __ABBREV.__Html.Element, d: any): void;
        };
        var ClubData : {
            (el: __ABBREV.__Html.Element, d: any): void;
        };
        var Tabs : {
            (): __ABBREV.__Html.Element;
        };
        var Main : {
            (): __ABBREV.__Html.Element;
        };
    }
    interface Marks {
        Club: string;
        UmpiresMark: number;
        CaptainsMark: number;
    }
    interface UmpirePitchMark {
        MatchDate: string;
        Inconsistency: number;
        Seam: number;
        Carry: number;
        Turn: number;
    }
    interface UmpireOutfieldMark {
        MatchDate: string;
        Unevenness: number;
        Appearance: number;
        Markings: number;
        Screens: number;
    }
    interface CaptainMark {
        MatchDate: string;
        Pitch: number;
        Outfield: number;
        Scoreboard: number;
        Changing: number;
    }
    interface Action {
    }
    interface Website {
    }
}
declare module Data {
    interface GroundMark {
        Club: string;
        UmpiresPitchAverage: number;
        UmpiresOutfieldAverage: number;
        CaptainsPitchAverage: number;
        CaptainsOutfieldAverage: number;
    }
}
declare module __ABBREV {
    
    export import __List = IntelliFactory.WebSharper.List;
    export import __Html = IntelliFactory.WebSharper.Html;
    export import __Visualization = IntelliFactory.WebSharper.Google.Visualization;
    export import __visualization = google.visualization;
    export import __WebSharper = IntelliFactory.WebSharper;
}
