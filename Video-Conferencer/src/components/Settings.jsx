import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function Sidebar()
{
  return (
  <>
    <div className="ml-[5vw] mt-[1vw] mb-[1.5vw] text-sec text-[2.6vw] font-bold"> Settings </div>
  </>)
}

function Settings()
{
  return <>
    <Sidebar />

    <center>
    <Tabs defaultValue="Video" className="w-[90vw]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger className="data-[state=active]:bg-sec" value="Video">Video</TabsTrigger>
        <TabsTrigger className="data-[state=active]:bg-sec" value="Audio">Audio</TabsTrigger>
        <TabsTrigger className="data-[state=active]:bg-sec" value="Accessibility">Accessibility</TabsTrigger>
      </TabsList>
      <TabsContent value="Video"><div className="text-sec">Make changes to the video settings here.</div></TabsContent>
      <TabsContent value="Audio"><div className="text-sec">Make changes to the audio settings here.</div></TabsContent>
      <TabsContent value="Accessibility"><div className="text-sec">Make changes to the accessibility settings here.</div></TabsContent>
    </Tabs>
    </center>
  </>
}

export default Settings;
