namespace GroundMarks

open IntelliFactory.WebSharper
open IntelliFactory.WebSharper.Html
open IntelliFactory.WebSharper.Google.Visualization

[<JavaScript>]
module Client =
    let chartOptions t = 
        ColumnChartOptions(width = 800,
                           height = 340,
                           vAxis = Axis(minValue = 0., maxValue = 5.),
                           hAxis = Axis(showTextEvery = 1, slantedText = true, slantedTextAngle = 50.),
                           backgroundColor = Color.HtmlColor "transparent",
                           title = t)

    let drawChart (v : ColumnChart) (o : ColumnChartOptions) (d : Async<Marks list>) = 
        async {
            let! data = d
            let chartData = IntelliFactory.WebSharper.Google.Visualization.Base.DataTable()
            chartData.addColumn(IntelliFactory.WebSharper.Google.Visualization.Base.ColumnType.StringType, "Club") |> ignore
            chartData.addColumn(IntelliFactory.WebSharper.Google.Visualization.Base.ColumnType.NumberType, "Umpires") |> ignore
            chartData.addColumn(IntelliFactory.WebSharper.Google.Visualization.Base.ColumnType.NumberType, "Captain") |> ignore

            chartData.addRows(data |> Seq.length) |> ignore
            data |> Seq.iteri(fun i m -> chartData.setCell(i, 0, m.Club) |> ignore
                                         chartData.setCell(i, 1, m.UmpiresMark) |> ignore
                                         chartData.setCell(i, 2, m.CaptainsMark) |> ignore)
            v.draw(chartData, o)
        } |> Async.Start

    let pitchRows (d : UmpirePitchMark seq) =
        d |> Seq.map(fun m -> TR[
                                   TD[Text m.MatchDate]
                                   TD[Text (m.Inconsistency.ToString())]
                                   TD[Text (m.Seam.ToString())]
                                   TD[Text (m.Carry.ToString())]
                                   TD[Text (m.Turn.ToString())]
                                ])

    let outfieldRows (d : UmpireOutfieldMark seq) =
        d |> Seq.map(fun m -> TR[
                                   TD[Text m.MatchDate]
                                   TD[Text (m.Unevenness.ToString())]
                                   TD[Text (m.Appearance.ToString())]
                                   TD[Text (m.Markings.ToString())]
                                   TD[Text (m.Screens.ToString())]
                                ])

    let captainRows (d : CaptainMark seq) =
        d |> Seq.map(fun m -> TR[
                                   TD[Text m.MatchDate]
                                   TD[Text (m.Pitch.ToString())]
                                   TD[Text (m.Outfield.ToString())]
                                   TD[Text (m.Changing.ToString())]
                                   TD[Text (m.Scoreboard.ToString())]
                                ])

    let drawUmpirePitchTable el d =
        async {
            let! data = d
            el -< 
            [
                IntelliFactory.WebSharper.Html.Default.Table[Attr.Class "table table-hover"] -<
                [
                    THead[
                        TR[
                            TH[Text "Match Date"]
                            TH[Text "Unevenness"]
                            TH[Text "Seam Movement"]
                            TH[Text "Carry and Bounce"]
                            TH[Text "Turn"]
                        ]
                    ]
                    TBody[] -< pitchRows data
                ]
            ] |> ignore
        } |> Async.Start

    let drawUmpireOutfieldTable el d =
        async {
            let! data = d
            el -< 
            [
                IntelliFactory.WebSharper.Html.Default.Table[Attr.Class "table table-hover"] -<
                [
                    THead[
                        TR[
                            TH[Text "Match Date"]
                            TH[Text "Unevenness"]
                            TH[Text "Appearance"]
                            TH[Text "Boundary Markings"]
                            TH[Text "Sight Screens"]
                        ]
                    ]
                    TBody[] -< outfieldRows data
                ]
            ] |> ignore
        } |> Async.Start

    let drawCaptainTable el d =
        async {
            let! data = d
            el -< 
            [
                IntelliFactory.WebSharper.Html.Default.Table[Attr.Class "table table-hover"] -<
                [
                    THead[
                        TR[
                            TH[Text "Match Date"]
                            TH[Text "Pitch"]
                            TH[Text "Outfield"]
                            TH[Text "Changing Rooms"]
                            TH[Text "Scoreboard"]
                        ]
                    ]
                    TBody[] -< captainRows data
                ]
            ] |> ignore
        } |> Async.Start

    let UmpirePitchTable(club) =
        Div[]
        |>! OnAfterRender(fun container -> drawUmpirePitchTable container (Remoting.UmpirePitchList club))

    let UmpireOutfieldTable(club) =
        Div[]
        |>! OnAfterRender(fun container -> drawUmpireOutfieldTable container (Remoting.UmpireOutfieldList club))

    let CaptainTable(club) =
        Div[]
        |>! OnAfterRender(fun container -> drawCaptainTable container (Remoting.CaptainList club))

    let FirstDivisionPitchChart() =
        Div[]
        |>! OnAfterRender(fun container -> drawChart (ColumnChart(container.Dom)) (chartOptions "Division 1 Pitch Marks") (Remoting.FirstDivisionPitchMarks()))

    let SecondDivisionPitchChart() =
        Div[]
        |>! OnAfterRender(fun container -> drawChart (ColumnChart(container.Dom)) (chartOptions "Division 2 Pitch Marks") (Remoting.SecondDivisionPitchMarks()))

    let FirstDivisionOutfieldChart() =
        Div[]
        |>! OnAfterRender(fun container -> drawChart (ColumnChart(container.Dom)) (chartOptions "Division 1 Outfield Marks") (Remoting.FirstDivisionOutfieldMarks()))

    let SecondDivisionOutfieldChart() =
        Div[]
        |>! OnAfterRender(fun container -> drawChart (ColumnChart(container.Dom)) (chartOptions "Division 2 Outfield Marks") (Remoting.SecondDivisionOutfieldMarks()))

    let ClubTabs el (d : Async<(string * string) list>) =
        async {
            let! data = d
            data |> Seq.iter(fun cl ->
            el -<
            [
                LI[A[HRef ("#" + snd cl)
                     Attr.NewAttr "data-toggle" "tab"
                     Text (fst cl)]]
            ] |> ignore)
        } |> Async.Start

    let ClubData el (d : Async<(string * string) list>) =        
        async {
            let! data = d
            data |> Seq.iter(fun cl -> 
            el -< 
            [
                Div[Attr.Class "tab-pane"
                    Attr.Id (snd cl)] -< [
                        Div[Attr.Class "col-md-12 well lead"
                            Text (fst cl)]
                        Div[Attr.Class "col-md-12"] -< [
                                                            Div[Attr.Class "lead"
                                                                Text "Umpires Pitch"]
                                                            UmpirePitchTable(fst cl)
                                                            Div[Attr.Class "lead"
                                                                Text "Umpires Outfield"]
                                                            UmpireOutfieldTable(fst cl)
                                                            Div[Attr.Class "lead"
                                                                Text "Captain"]
                                                            CaptainTable(fst cl)
                                                       ]
                    ]
            ] |> ignore)
        } |> Async.Start

    let Tabs () =
        UL[Attr.Class "nav nav-tabs"] -<
        [
            LI[Attr.Class "active"] -< [A[HRef "#pitch"
                                          Attr.NewAttr "data-toggle" "tab"
                                          Text "Pitch Marks"]]
            LI[A[HRef "#outfield"
                 Attr.NewAttr "data-toggle" "tab"
                 Text "Outfield Marks"]]
            LI[Attr.Class "dropdown"] -<
            [
                A[Attr.Class "dropdown-toggle"
                  Attr.NewAttr "data-toggle" "dropdown"
                  HRef "#"
                  Text "Clubs"] -< [
                                        Span[Attr.Class "caret"]
                                   ]

                UL[Attr.Class "dropdown-menu"
                   Attr.Id "clubDropdown"] |>! OnAfterRender(fun container -> ClubTabs container (Remoting.ClubList()))
            ]
        ]

    let Main () =
        Div[Attr.Class "container"] -<
        [
            Tabs()
            Div [Attr.Class "tab-content"] -< 
            [
                Div[Attr.Class "tab-pane active in"
                    Attr.Id "pitch"] -< [
                        Div[Attr.Class "col-md-12"] -< [FirstDivisionPitchChart()]
                        Div[Attr.Class "col-md-12"] -< [SecondDivisionPitchChart()]
                    ]
            
                Div[Attr.Class "tab-pane"
                    Attr.Id "outfield"] -< [
                        Div[Attr.Class "col-md-12"] -< [FirstDivisionOutfieldChart()]
                        Div[Attr.Class "col-md-12"] -< [SecondDivisionOutfieldChart()]
                    ]
            ]
            |>! OnAfterRender(fun container -> ClubData container (Remoting.ClubList()))
        ]
 