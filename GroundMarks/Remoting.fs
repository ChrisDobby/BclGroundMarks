namespace GroundMarks

open IntelliFactory.WebSharper
open Data

type Marks = {
    Club : string
    UmpiresMark : float
    CaptainsMark : float
}

type UmpirePitchMark = {
    MatchDate : string
    Inconsistency : int
    Seam : int
    Carry : int
    Turn : int
}

type UmpireOutfieldMark = {
    MatchDate : string
    Unevenness : int
    Appearance : int
    Markings : int
    Screens : int
}

type CaptainMark = {
    MatchDate : string
    Pitch : int
    Outfield : int
    Scoreboard : int
    Changing : int
}

module Remoting =
    let firstDivisionClubs = [
                                "Cleckheaton", "cleckheaton"
                                "Woodlands", "woodlands"
                                "Hanging Heaton", "hanging_heaton"
                                "Farsley", "farsley"
                                "Pudsey St Lawrence", "psl"
                                "Pudsey Congs", "pudsey_congs"
                                "New Farnley", "new_farnley"
                                "Bradford & Bingley", "b_and_b"
                                "Morley", "morley"
                                "Yeadon", "yeadon"
                                "Lightcliffe", "lightcliffe"
                                "East Bierley", "bierley"
                             ]

    let secondDivisionClubs = [
                                "Undercliffe", "undercliffe"
                                "Keighley", "keighley"
                                "Gomersal", "gomersal"
                                "Bowling Old Lane", "old_lane"
                                "Bankfoot", "bankfoot"
                                "Brighouse", "brighouse"
                                "Windhill", "windhill"
                                "Great Horton", "great_horton"
                                "Saltaire", "saltaire"
                                "Hartshead Moor", "hartshead"
                                "Idle", "idle"
                                "Spen Victoria", "spen_vic"
                                "Baildon", "baildon"
                              ]

    [<Remote>]
    let FirstDivisionPitchMarks() =
        async {
            return groundMarks 
                |> List.filter(fun m -> firstDivisionClubs |> List.exists(fun c -> (fst c).ToUpper() = m.Club.ToUpper())) 
                |> List.map(fun m -> {Club = m.Club; UmpiresMark = System.Math.Round(m.UmpiresPitchAverage, 2); CaptainsMark = System.Math.Round(m.CaptainsPitchAverage, 2)})
                |> List.sortBy(fun m -> m.Club)
        }

    [<Remote>]
    let SecondDivisionPitchMarks() =
        async {
            return groundMarks 
                |> List.filter(fun m -> secondDivisionClubs |> List.exists(fun c -> (fst c).ToUpper() = m.Club.ToUpper())) 
                |> List.map(fun m -> {Club = m.Club; UmpiresMark = System.Math.Round(m.UmpiresPitchAverage, 2); CaptainsMark = System.Math.Round(m.CaptainsPitchAverage, 2)})
                |> List.sortBy(fun m -> m.Club)
        }

    [<Remote>]
    let FirstDivisionOutfieldMarks() =
        async {
            return groundMarks 
                |> List.filter(fun m -> firstDivisionClubs |> List.exists(fun c -> (fst c).ToUpper() = m.Club.ToUpper())) 
                |> List.map(fun m -> {Club = m.Club; UmpiresMark = System.Math.Round(m.UmpiresOutfieldAverage, 2); CaptainsMark = System.Math.Round(m.CaptainsOutfieldAverage, 2)})
                |> List.sortBy(fun m -> m.Club)
        }

    [<Remote>]
    let SecondDivisionOutfieldMarks() =
        async {
            return groundMarks 
                |> List.filter(fun m -> secondDivisionClubs |> List.exists(fun c -> (fst c).ToUpper() = m.Club.ToUpper())) 
                |> List.map(fun m -> {Club = m.Club; UmpiresMark = System.Math.Round(m.UmpiresOutfieldAverage, 2); CaptainsMark = System.Math.Round(m.CaptainsOutfieldAverage, 2)})
                |> List.sortBy(fun m -> m.Club)
        }

    [<Remote>]
    let ClubList() =
        async {
            return firstDivisionClubs |> List.append secondDivisionClubs |> List.sort
        }

    [<Remote>]
    let UmpirePitchList (club : string) =
        async {
            return umpiresMarks (club) |> List.map(fun m -> {MatchDate = m.MatchDate.ToShortDateString(); Inconsistency = m.Inconsistency;Seam = m.Seam;Carry = m.CarryAndBounce;Turn = m.Turn})
        }

    [<Remote>]
    let UmpireOutfieldList (club : string) =
        async {
            return umpiresMarks (club) |> List.map(fun m -> {MatchDate = m.MatchDate.ToShortDateString(); Unevenness = m.Uneveness; Appearance = m.Appearance; Markings = m.BoundaryMarkings; Screens = m.SightScreens})
        }

    [<Remote>]
    let CaptainList (club : string) =
        async {
            return captainsMarks (club) |> List.map(fun m -> {MatchDate = m.MatchDate.ToShortDateString();Pitch = m.Pitch;Outfield = m.Outfield;Changing = m.ChangingRooms;Scoreboard = m.Scoreboard})
        }