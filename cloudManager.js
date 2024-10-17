import { cloudTilemap, createCloud, createCloudWithRandomPosition } from './cloud.js';

class CloudManager {
    constructor(container, maxRandomClouds = 12) {
        this.container = container;
        this.maxRandomClouds = maxRandomClouds;
        this.randomCloudCount = 0;
        this.clickedCloudCount = 0;
    }

    generateCloud() {
        if (this.randomCloudCount >= this.maxRandomClouds) return;

        const cloud = createCloudWithRandomPosition(
            cloudTilemap,
            "cloud-sml",
            "cloud-container"
        );
        this.container.appendChild(cloud);
        this.randomCloudCount++;

        // Remove cloud when it goes off-screen to the right
        const checkCloudPosition = () => {
            const cloudRect = cloud.getBoundingClientRect();
            if (cloudRect.left > window.innerWidth) {
                this.container.removeChild(cloud);
                this.randomCloudCount--;
            } else {
                requestAnimationFrame(checkCloudPosition);
            }
        };
        requestAnimationFrame(checkCloudPosition);

        // Generate next cloud
        if (this.randomCloudCount < this.maxRandomClouds) {
            setTimeout(() => this.generateCloud(), Math.random() * 3000 + 1000);
        }
    }

    start() {
        this.generateCloud();
    }

    createCloudAtPosition(x, y) {
        const cloud = createCloud(cloudTilemap, "cloud-sml", "cloud-container");
        cloud.style.position = 'absolute';
        cloud.style.left = `${x}px`;
        cloud.style.top = `${y}px`;
        
        const animationDuration = Math.random() * 90 + 30;
        cloud.style.animationName = "float-cloud";
        cloud.style.animationDuration = `${animationDuration}s`;
        cloud.style.animationIterationCount = "infinite";
        cloud.style.animationTimingFunction = "linear";

        this.container.appendChild(cloud);
        this.clickedCloudCount++;

        // Remove cloud when it goes off-screen 
        const checkCloudPosition = () => {
            const cloudRect = cloud.getBoundingClientRect();
            if (cloudRect.left > window.innerWidth) {
                this.container.removeChild(cloud);
                this.clickedCloudCount--;
            } else {
                requestAnimationFrame(checkCloudPosition);
            }
        };
        requestAnimationFrame(checkCloudPosition);
    }

    getTotalCloudCount() {
        return this.randomCloudCount + this.clickedCloudCount;
    }
}

export default CloudManager;
