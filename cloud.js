const cloudTilemap = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

function createCloud(tilemap, cloudClassName, containerClassName) {
    const cloudContainer = document.createElement("div");
    cloudContainer.className = cloudClassName;

    // Create grid container for cloud
    const cloudGridContainer = document.createElement("div");
    cloudGridContainer.className = containerClassName;
    cloudGridContainer.style.display = "grid";
    cloudGridContainer.style.gridTemplateColumns = `repeat(${tilemap[0].length}, 4px)`;
    cloudGridContainer.style.gridTemplateRows = `repeat(${tilemap.length}, 4px)`;

    for (let y = 0; y < tilemap.length; y++) {
        for (let x = 0; x < tilemap[y].length; x++) {
            const tile = document.createElement("div");
            tile.className = "tile" + (tilemap[y][x] === 1 ? " tile-filled" : "");
            tile.style.gridRow = y + 1;
            tile.style.gridColumn = x + 1;
            cloudGridContainer.appendChild(tile);
        }
    }

    cloudContainer.appendChild(cloudGridContainer);
    return cloudContainer;
}

function getRandomPosition() {
    const viewportHeight = window.innerHeight;
    const cloudHeight = 24; // Adjust based on your cloud size
    return {
        top: Math.floor(Math.random() * (viewportHeight - cloudHeight)),
        left: Math.floor(Math.random() * -window.innerWidth) // Start clouds off-screen to the left
    };
}

function createCloudWithRandomPosition(tilemap, cloudClassName, containerClassName) {
    const cloud = createCloud(tilemap, cloudClassName, containerClassName);
    const position = getRandomPosition();

    cloud.style.top = `${position.top}px`;
    cloud.style.left = `-100px`;
    cloud.style.position = "absolute";
    // Add random animation duration
    const animationDuration = Math.random() * 90 + 30;
    cloud.style.animationName = "float-cloud";
    cloud.style.animationDuration = `${animationDuration}s`;
    cloud.style.animationIterationCount = "infinite";
    cloud.style.animationTimingFunction = "linear";

    return cloud;
}

export { cloudTilemap, createCloud, getRandomPosition, createCloudWithRandomPosition };
