module Data

open FSharp.Data

type GroundMarksFeed = JsonProvider<".\GroundMarks.json">

type GroundMark = {
        Club : string
        UmpiresPitchAverage : float
        UmpiresOutfieldAverage : float
        CaptainsPitchAverage : float
        CaptainsOutfieldAverage : float
    }

let marks = GroundMarksFeed.Load("http://bclassessments.azurewebsites.net/api/GroundMarks")
//let marks = GroundMarksFeed.Load(".\GroundMarks.json")

let groundMarks =
    marks
        |> Seq.filter(fun m -> m.CaptainMarks.Length > 0 && m.UmpireMarks.Length > 0)
        |> Seq.map(fun m -> let unevenness = float (m.UmpireMarks |> Seq.map(fun u -> u.Inconsistency) |> Seq.sum) / float m.UmpireMarks.Length
                            let seam = float (m.UmpireMarks |> Seq.map(fun s -> s.Seam) |> Seq.sum) / float m.UmpireMarks.Length
                            let carry = float (m.UmpireMarks |> Seq.map(fun c -> c.CarryAndBounce) |> Seq.sum) / float m.UmpireMarks.Length
                            let turn = float (m.UmpireMarks |> Seq.map(fun t -> t.Turn) |> Seq.sum) / float m.UmpireMarks.Length
                            let uneven_outfield = float (m.UmpireMarks |> Seq.map(fun u -> u.Uneveness) |> Seq.sum) / float m.UmpireMarks.Length
                            let grass = float (m.UmpireMarks |> Seq.map(fun g -> g.Appearance) |> Seq.sum) / float m.UmpireMarks.Length
                            let markings = float (m.UmpireMarks |> Seq.map(fun m -> m.BoundaryMarkings) |> Seq.sum) / float m.UmpireMarks.Length
                            let screens = float (m.UmpireMarks |> Seq.map(fun s -> s.SightScreens) |> Seq.sum) / float m.UmpireMarks.Length
                            let pitch = float (m.CaptainMarks |> Seq.map(fun p -> p.Pitch) |> Seq.sum) / float m.CaptainMarks.Length
                            let outfield = float (m.CaptainMarks |> Seq.map(fun o -> o.Outfield) |> Seq.sum) / float m.CaptainMarks.Length
                            {
                                Club = m.ClubName
                                UmpiresPitchAverage = (unevenness + seam + carry + turn) / 4.0
                                UmpiresOutfieldAverage = (uneven_outfield + grass + markings + screens) / 4.0
                                CaptainsPitchAverage = pitch
                                CaptainsOutfieldAverage = outfield
                            })
        |> Seq.toList

let umpiresMarks (club : string) =
    (marks
        |> Seq.find(fun m -> m.ClubName.ToUpper() = club.ToUpper())).UmpireMarks
        |> Seq.toList

let captainsMarks (club : string) =
    (marks
        |> Seq.find(fun m -> m.ClubName.ToUpper() = club.ToUpper())).CaptainMarks
        |> Seq.toList
    