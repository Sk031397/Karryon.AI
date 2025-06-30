'use client'
import { Button } from '@/components/ui/button';
import Image from 'next/image';

type Agent = {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  videoUrl: string;
};

const availableAgents: Agent[] = [
  {
    id: 'agent-001',
    title: 'Education Tutor – Math Basics',
    category: 'Education',
    thumbnail: '/logo.png',
    videoUrl: 'https://cdn.tavus.ai/videos/agent-001.mp4',
  },
  {
    id: 'agent-002',
    title: 'Health Check Agent – Wellness Intro',
    category: 'Healthcare',
    thumbnail: '/logo.png',
    videoUrl: 'https://cdn.tavus.ai/videos/agent-002.mp4',
  },
  {
    id: 'agent-003',
    title: 'Interview Coach – PM Role',
    category: 'Career',
    thumbnail: '/logo.png',
    videoUrl: 'https://cdn.tavus.ai/videos/agent-003.mp4',
  },
  {
    id: 'agent-004',
    title: 'Language Trainer – Spanish Greetings',
    category: 'Language',
    thumbnail: '/logo.png',
    videoUrl: 'https://cdn.tavus.ai/videos/agent-004.mp4',
  },
];

export default function AgentsList() {
  return (
    <div className="mt-10">
      <h2 className="font-bold text-xl mb-4">AI Specialized Agents</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {availableAgents.map((agent) => (
          <div
            key={agent.id}
            className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm overflow-hidden"
          >
            <div className="relative">
              <Image
                src={agent.thumbnail}
                width={150}
                height={50}
                alt={agent.title}
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg text-neutral-800 dark:text-white">
                {agent.title}
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                {agent.category}
              </p>
              <a
                href={agent.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="mt-3 w-full">Watch Agent</Button>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
