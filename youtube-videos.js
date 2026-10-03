// YouTube talks and interviews
// Update this file manually to add new videos

const youtubeVideos = [
    {
        title: "End-to-end Generative AI workflows for developers | Data & AI Masters | Canonical and NVIDIA",
        date: "2024-11-21",
        source: "YouTube",
        url: "https://www.youtube.com/watch?v=CIP22DXVrVE",
        tags: ["genai", "nvidia", "canonical", "talk"]
    },
    {
        title: "DevOps in the land of MLOps",
        date: "2024-05-18",
        source: "YouTube",
        url: "https://www.youtube.com/watch?v=QWnuxd216pA",
        tags: ["devops", "mlops", "talk"]
    },
    {
        title: "Czym zajmuje się Data Engineer? (What does a Data Engineer do?)",
        date: "2020-12-22",
        source: "YouTube",
        url: "https://www.youtube.com/watch?v=ko5Puc7ewAg",
        tags: ["data-engineering", "interview", "polish"]
    }
];

if (typeof window !== 'undefined') {
    window.youtubeVideos = youtubeVideos;
}
