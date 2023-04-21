async function getJson(filePath: string) {
    try {
        return JSON.parse(await Deno.readTextFile(filePath));
    } catch(e) {
        console.log(filePath+': '+e.message);
    }
}

const path = "flinders.ptcl.json"
const ptclJson = await getJson(path);
console.log(ptclJson.AreaMapDePtr.numPathSections, ptclJson.AreaMapDePtr.pathSections.length);
const pathSections = ptclJson.AreaMapDePtr.pathSections;

pathSections.splice(
    ptclJson.AreaMapDePtr.numPathSections,
    ptclJson.AreaMapDePtr.pathSections.length - ptclJson.AreaMapDePtr.numPathSections
);

delete ptclJson.AreaMapDePtr.vehicleClasses;
delete ptclJson.AreaMapDePtr.boundaries;
delete ptclJson.AreaMapDePtr.numBoundaries;
delete ptclJson.AreaMapDePtr.staticObjects;
delete ptclJson.AreaMapDePtr.trafficLights;
delete ptclJson.AreaMapDePtr.stopYieldLines;
delete ptclJson.AreaMapDePtr.parkingSpaces;
delete ptclJson.AreaMapDePtr.maneuveringAreas;

for (let i = 0; i < pathSections.length; i++) {
    const pathSection = pathSections[i];
    pathSection.elements.splice(pathSection.numElements, pathSection.elements.length - pathSection.numElements);

    console.log(pathSection.numElements, pathSection.elements.length);
}

// deno save file to disk
Deno.writeTextFile("flinders.compacted.ptcl.json", JSON.stringify(ptclJson, null, 2));