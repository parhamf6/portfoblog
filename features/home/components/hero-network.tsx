import React, { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';

const Interactive3DNetwork = () => {
  const canvasRef = useRef();
  const sceneRef = useRef();
  const rendererRef = useRef();
  const cameraRef = useRef();
  const nodesRef = useRef([]);
  const linesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef();
  const particlesRef = useRef();

  // Enhanced config for developer aesthetic
  const config = {
    nodeCount: 35,
    maxDistance: 180,
    nodeSpeed: 0.15,
    mouseInfluence: 120,
    particleCount: 200
  };

  // Create nodes with tech-focused positioning
  const nodes = useMemo(() => {
    return Array.from({ length: config.nodeCount }, (_, i) => ({
      id: i,
      position: new THREE.Vector3(
        (Math.random() - 0.3) * 700, // Bias towards left side
        (Math.random() - 0.5) * 500,
        (Math.random() - 0.5) * 150
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * config.nodeSpeed,
        (Math.random() - 0.5) * config.nodeSpeed,
        (Math.random() - 0.5) * config.nodeSpeed * 0.5
      ),
      originalPosition: null,
      size: Math.random() * 1.5 + 0.8,
      nodeType: Math.random() > 0.7 ? 'primary' : 'secondary',
      pulsePhase: Math.random() * Math.PI * 2
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    // Scene setup with better quality
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, rect.width / rect.height, 0.1, 2000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    
    renderer.setSize(rect.width, rect.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.set(50, 0, 350);

    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;

    // Store original positions
    nodes.forEach(node => {
      node.originalPosition = node.position.clone();
    });

    // Enhanced geometries for tech look
    const primaryNodeGeometry = new THREE.OctahedronGeometry(1, 1);
    const secondaryNodeGeometry = new THREE.SphereGeometry(0.8, 12, 8);
    
    // Tech-inspired materials with proper colors
    const primaryMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x00ff88, // Bright cyan-green
      transparent: true,
      opacity: 0.9
    });
    
    const secondaryMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x0088ff, // Electric blue
      transparent: true,
      opacity: 0.8
    });

    // Create floating particles for ambiance
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(config.particleCount * 3);
    const particleVelocities = [];
    
    for (let i = 0; i < config.particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 1000;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 600;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 200;
      
      particleVelocities.push({
        x: (Math.random() - 0.5) * 0.1,
        y: (Math.random() - 0.5) * 0.1,
        z: (Math.random() - 0.5) * 0.05
      });
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x444444,
      size: 1,
      transparent: true,
      opacity: 0.6
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
    particlesRef.current = { geometry: particleGeometry, velocities: particleVelocities };

    // Create nodes with different types
    nodes.forEach((node, i) => {
      const geometry = node.nodeType === 'primary' ? primaryNodeGeometry : secondaryNodeGeometry;
      const material = node.nodeType === 'primary' ? primaryMaterial.clone() : secondaryMaterial.clone();
      
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.copy(node.position);
      mesh.scale.setScalar(node.size);
      scene.add(mesh);
      nodesRef.current[i] = mesh;
      
      // Enhanced glow effect
      const glowGeometry = node.nodeType === 'primary' 
        ? new THREE.OctahedronGeometry(1.8, 1) 
        : new THREE.SphereGeometry(1.4, 12, 8);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: node.nodeType === 'primary' ? 0x00ff88 : 0x0088ff,
        transparent: true,
        opacity: 0.15,
        side: THREE.BackSide
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      mesh.add(glow);
    });

    // Enhanced line materials
    const primaryLineMaterial = new THREE.LineBasicMaterial({ 
      color: 0x00aa66,
      transparent: true,
      opacity: 0.4
    });
    
    const secondaryLineMaterial = new THREE.LineBasicMaterial({ 
      color: 0x0066aa,
      transparent: true,
      opacity: 0.3
    });

    // Mouse interaction
    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    // Enhanced animation loop
    const animate = () => {
      const time = Date.now() * 0.001;
      
      // Update particles
      const positions = particlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < config.particleCount; i++) {
        const velocity = particlesRef.current.velocities[i];
        positions[i * 3] += velocity.x;
        positions[i * 3 + 1] += velocity.y;
        positions[i * 3 + 2] += velocity.z;
        
        // Boundary wrapping
        if (Math.abs(positions[i * 3]) > 500) velocity.x *= -1;
        if (Math.abs(positions[i * 3 + 1]) > 300) velocity.y *= -1;
        if (Math.abs(positions[i * 3 + 2]) > 100) velocity.z *= -1;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;

      // Update nodes with enhanced interactions
      nodes.forEach((node, i) => {
        const mesh = nodesRef.current[i];
        if (!mesh) return;

        // Mouse interaction with smooth falloff
        const mouse3D = new THREE.Vector3(
          mouseRef.current.x * 350,
          mouseRef.current.y * 250,
          0
        );
        
        const distance = node.position.distanceTo(mouse3D);
        if (distance < config.mouseInfluence) {
          const force = mouse3D.clone().sub(node.position).normalize();
          const strength = (config.mouseInfluence - distance) / config.mouseInfluence;
          force.multiplyScalar(strength * 3);
          node.position.add(force);
          
          // Enhance glow on interaction
          mesh.material.opacity = Math.min(1, 0.9 + strength * 0.3);
        } else {
          // Smooth return to original position
          const returnForce = node.originalPosition.clone().sub(node.position);
          returnForce.multiplyScalar(0.03);
          node.position.add(returnForce);
          mesh.material.opacity = 0.9;
        }

        // Subtle floating with individual phase
        node.position.add(node.velocity);
        
        // Enhanced boundary system
        const bounds = { x: 350, y: 250, z: 75 };
        ['x', 'y', 'z'].forEach(axis => {
          if (Math.abs(node.position[axis]) > bounds[axis]) {
            node.velocity[axis] *= -0.8;
            node.position[axis] = Math.sign(node.position[axis]) * bounds[axis];
          }
        });

        mesh.position.copy(node.position);
        
        // Individual pulse animation with different phases
        const pulse = Math.sin(time * 2 + node.pulsePhase) * 0.15 + 1;
        mesh.scale.setScalar(node.size * pulse);
        
        // Rotate primary nodes for tech effect
        if (node.nodeType === 'primary') {
          mesh.rotation.x += 0.01;
          mesh.rotation.y += 0.008;
        }
      });

      // Enhanced connection system
      linesRef.current.forEach(line => scene.remove(line));
      linesRef.current = [];

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const distance = nodes[i].position.distanceTo(nodes[j].position);
          
          if (distance < config.maxDistance) {
            const lineGeometry = new THREE.BufferGeometry();
            const positions = new Float32Array([
              nodes[i].position.x, nodes[i].position.y, nodes[i].position.z,
              nodes[j].position.x, nodes[j].position.y, nodes[j].position.z
            ]);
            lineGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            
            const opacity = Math.pow(1 - (distance / config.maxDistance), 2);
            
            // Use different materials based on node types
            const bothPrimary = nodes[i].nodeType === 'primary' && nodes[j].nodeType === 'primary';
            const material = bothPrimary ? primaryLineMaterial.clone() : secondaryLineMaterial.clone();
            material.opacity = opacity * (bothPrimary ? 0.6 : 0.4);
            
            const line = new THREE.Line(lineGeometry, material);
            scene.add(line);
            linesRef.current.push(line);
          }
        }
      }

      // Smooth camera movement
      camera.position.x = Math.sin(time * 0.1) * 15 + 50;
      camera.position.y = Math.cos(time * 0.08) * 8;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(animate);
    };

    animate();
    canvas.addEventListener('mousemove', handleMouseMove);

    // Handle resize
    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      camera.aspect = rect.width / rect.height;
      camera.updateProjectionMatrix();
      renderer.setSize(rect.width, rect.height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      scene.clear();
      renderer.dispose();
    };
  }, [nodes]);

  return (
    <div className="absolute inset-0 overflow-hidden opacity-90">
      <canvas 
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: 'transparent' }}
      />
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/10 pointer-events-none" />
    </div>
  );
};

export default Interactive3DNetwork;