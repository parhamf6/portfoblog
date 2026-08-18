import { ProjectData } from "@/types/project";
import { Sparkle, ArrowsOut, Stack } from "@phosphor-icons/react";
export const ExcalidrawStateMachineData: ProjectData = {
  title: "Excalidraw State Machine",
  tagline:
    "A keyframe-style animation engine for Excalidraw inside Obsidian — smoothly interpolating position, size, rotation, and color between link-triggered states.",
  duration: "Early stage",
  role: "Creator & Developer",
  status: "Live",

  quickSummary: {
    problem: {
      title: "Problem Solved",
      short: "Static Excalidraw frames can't show smooth animated transitions",
      detailed:
        "Excalidraw drawings in Obsidian are static — there was no way to create smooth, keyframe-style animations where elements interpolate position, size, rotation, and color. Building explainer or presentation sequences inside Excalidraw required manual, jarring jumps between frames.",
    },
    solution: {
      title: "Our Solution",
      short: "Two scripts that turn duplicated frames into an animated state machine",
      detailed:
        "This project provides two ExcalidrawAutomate scripts that work together. Helper_DuplicateState.js duplicates a frame and stamps persistent tweenId customData on every child element. PlayHook_StateMachine.js reads these IDs and, on playback, interpolates matched elements' position, size, rotation, and color via a link click — using immutable rendering for smooth, pixel-perfect repaints.",
    },
    impact: {
      title: "Results Achieved",
      short: "Fluid, link-triggered animations inside Excalidraw",
      detailed:
        "Users can now build slide-style sequences where elements smoothly tween between states, with multi-group support, custom easing and timing, and clean duplication of complex elements (Mermaid diagrams, grouped shapes, library items).",
    },
  },

  processFlow: {
    title: "Development Process",
    description: "From a personal workflow need to a reusable Excalidraw animation engine",
    blogPostUrl: "/blogs/excalidraw-state-machine-the-story-behind-it",
    stages: [
      { name: "Identify", duration: "Early", description: "Recognized the need for smooth transitions in Excalidraw drawings" },
      { name: "Design", duration: "Early", description: "Element Matching via tweenId and Immutable Interpolation as core mechanics" },
      { name: "Build", duration: "Early", description: "Two ExcalidrawAutomate scripts: the duplicator and the animation engine" },
      { name: "Release", duration: "Early", description: "Open early-stage release focused on the creator's own workflow" }
    ],
  },

  projectImages: [
    {
      id: 1,
      title: "State Frames",
      description: "Duplicated frames (state:1, state:2) sharing tweenId customData",
      url: "screenshot-states.jpg",
      category: "Desktop",
    },
    {
      id: 2,
      title: "Opacity Stacking",
      description: "Editing workflow that stacks frames to align elements",
      url: "screenshot-editing.jpg",
      category: "Desktop",
    },
  ],

  problem:
    "Excalidraw inside Obsidian is static. Creating animated explainer or presentation sequences requires smooth interpolation of element properties between frames, which the tool doesn't support natively — leaving creators to settle for jarring jumps or external tools.",
  solution:
    "A two-script system. Helper_DuplicateState.js duplicates frames and stamps persistent tweenId customData on every child element (and retroactively on the original). PlayHook_StateMachine.js reads these IDs during playback: matched elements are interpolated via lerp() across position, size, rotation, and color; unmatched elements fade in or out. Rendering is immutable — a fresh element array is pushed each requestAnimationFrame tick via api.updateScene() — to avoid stutter.",
  targetUsers:
    "Obsidian users and Excalidraw creators who want keyframe-style animations and slide sequences inside their drawings, especially for explainers, presentations, and interactive diagrams.",
  techStack: ["Obsidian", "Excalidraw", "ExcalidrawAutomate", "JavaScript"],
  architecture:
    "Two ExcalidrawAutomate scripts. The engine relies on Element Matching (persistent tweenId customData) and Immutable Interpolation (fresh lerp'd element arrays pushed via api.updateScene() every frame). Opacity is used as an editing toggle via an 'opacity stacking' workflow, and multi-group support allows independent slide sequences on one canvas.",
  keyFeatures: [
    "Smooth property interpolation: x, y, width, height, angle, strokeWidth, fontSize, strokeColor, backgroundColor",
    "Multi-group support: multiple independent slide sequences on the same canvas",
    "Clean duplication: remaps containerId, startBinding, endBinding, and groupIds to prevent snapping",
    "Custom easing and timing via customData on the source frame",
    "Fade in/out for unmatched elements instead of popping",
    "Immutable rendering for pixel-perfect, stutter-free repaints",
    "Opacity stacking workflow for easy editing of complex animations"
  ],
  challenges: [
    {
      challenge: "Smooth, stutter-free repaints",
      solution:
        "Used immutable rendering — generating a completely new array of lerp'd element objects each requestAnimationFrame tick and pushing it via api.updateScene() — instead of mutating elements directly.",
    },
    {
      challenge: "Duplicating complex elements safely",
      solution:
        "Remapped all internal bindings (containerId, startBinding, endBinding) and groupIds during duplication to prevent snapping or group overlaps, even for Mermaid diagrams and library items.",
    },
    {
      challenge: "Editing complex animations",
      solution:
        "Introduced an 'opacity stacking' workflow where non-active frames' elements are set to 0 opacity and stacked on the source, letting editors align and modify elements while seeing the base frame beneath.",
    }
  ],
  results: {
    metrics: [
      { label: "Interpolates", value: "9 props", icon: ArrowsOut },
      { label: "Groups", value: "Multi", icon: Stack },
      { label: "Rendering", value: "Immutable", icon: Sparkle },
    ],
    feedback:
      "\"A neat way to get keyframe-style animation out of Excalidraw inside Obsidian.\"",
    learning:
      "This 'vibe coded' project taught me the ExcalidrawAutomate scripting API, immutable rendering patterns for smooth animation, and how to design a state-machine abstraction with element matching for tweening.",
  },
  links: {
    demo: "",
    github: "https://github.com/parhamf6/excalidraw-state-machine",
    caseStudy: "/blogs/excalidraw-state-machine-the-story-behind-it",
  },
};
