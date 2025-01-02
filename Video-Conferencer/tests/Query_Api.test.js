import { expect, test } from "vitest"

import * as Data from "./Test_Data.js"
import * as Query from "../src/utils/Query_Api.jsx"

// Testing the Get_Stream_Token() function
test("Testing the Get_Stream_Token() function", () => {

  for (const input in Data.GET_TOKEN) {
    let token = Query.Get_Stream_Token(input)
    expect(token).toBe(Data.GET_TOKEN[input])
  }
})

// Testing the get call id, end call workflow
test("Testing Get_Call_Id(), Check_Ongoing() and End_Call() functions", () => {

  let Call_Id = Query.Get_Call_Id()
  expect( Query.Check_Ongoing(Call_Id) ).toBe(true)
  Query.End_Call(Call_Id)
})
