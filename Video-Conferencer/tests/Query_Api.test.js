import { expect, test } from "vitest"

import * as Data from "./Test_Data.js"
import * as Query from "../src/utils/Query_Api.jsx"

// Testing the Get_Stream_Token() function
test("Testing the Get_Stream_Token() function", () => {


  for (const input in Data.GET_TOKEN)
    expect(Query.Get_Stream_Token(input)).toBe(Data.GET_TOKEN[input])
})
