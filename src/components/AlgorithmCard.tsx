import { Badge } from "./ui/badge";

interface AlgorithmCardProps {
  title: string;
  author: string;
  language: string;
  difficulty: string;
  timeComplexity: string;
  spaceComplexity: string;
  description: string;
  tags: string[];
  likes: number;
  timeAgo: string;
}

export function AlgorithmCard({
  title,
  author,
  language,
  difficulty,
  timeComplexity,
  spaceComplexity,
  description,
  tags,
  likes,
  timeAgo
}: AlgorithmCardProps) {
  // 알고리즘 유형에 따른 썸네일 생성
  const getThumbnailStyle = () => {
    const primaryTag = tags[0];
    if (primaryTag === "Array" || primaryTag === "Hash Table") {
      return "bg-gradient-to-br from-blue-50 to-blue-100";
    } else if (primaryTag === "Tree" || primaryTag === "DFS") {
      return "bg-gradient-to-br from-green-50 to-green-100";
    } else if (primaryTag === "String" || primaryTag === "Dynamic Programming") {
      return "bg-gradient-to-br from-purple-50 to-purple-100";
    } else if (primaryTag === "Graph" || primaryTag === "BFS") {
      return "bg-gradient-to-br from-orange-50 to-orange-100";
    } else {
      return "bg-gradient-to-br from-gray-50 to-gray-100";
    }
  };

  const getIconForAlgorithm = () => {
    const primaryTag = tags[0];
    if (primaryTag === "Array" || primaryTag === "Hash Table") {
      return (
        <div className="flex items-center justify-center space-x-1">
          <div className="w-2 h-2 bg-blue-400 rounded-sm"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-sm"></div>
          <div className="w-2 h-2 bg-blue-600 rounded-sm"></div>
        </div>
      );
    } else if (primaryTag === "Tree" || primaryTag === "DFS") {
      return (
        <div className="flex flex-col items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mb-1"></div>
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          </div>
        </div>
      );
    } else if (primaryTag === "String") {
      return (
        <div className="flex items-center space-x-1">
          <span className="text-purple-500 font-mono">abc</span>
        </div>
      );
    } else if (primaryTag === "Graph" || primaryTag === "BFS") {
      return (
        <div className="relative">
          <div className="w-2 h-2 bg-orange-500 rounded-full absolute top-0 left-0"></div>
          <div className="w-2 h-2 bg-orange-500 rounded-full absolute top-0 right-4"></div>
          <div className="w-2 h-2 bg-orange-500 rounded-full absolute top-4 left-2"></div>
          <div className="w-0.5 h-3 bg-orange-400 absolute top-1 left-1 rotate-45"></div>
          <div className="w-0.5 h-3 bg-orange-400 absolute top-1 left-3 -rotate-45"></div>
        </div>
      );
    } else {
      return (
        <div className="text-gray-500 font-mono text-xs">
          {`{}`}
        </div>
      );
    }
  };

  return (
    <div className="group cursor-pointer transition-all duration-300 hover:scale-105">
      {/* Thumbnail */}
      <div className={`aspect-[16/10] ${getThumbnailStyle()} rounded-lg mb-4 relative overflow-hidden border border-gray-100`}>
        {/* Algorithm Icon */}
        <div className="absolute top-4 left-4">
          {getIconForAlgorithm()}
        </div>
        
        {/* Difficulty Badge */}
        <div className="absolute top-4 right-4">
          <Badge 
            variant="outline" 
            className={`
              ${difficulty === 'Easy' ? 'border-green-200 text-green-700 bg-green-50' :
                difficulty === 'Medium' ? 'border-yellow-200 text-yellow-700 bg-yellow-50' :
                'border-red-200 text-red-700 bg-red-50'
              } rounded-full text-xs font-light
            `}
          >
            {difficulty}
          </Badge>
        </div>

        {/* Language */}
        <div className="absolute bottom-4 left-4">
          <span className="text-xs font-mono bg-white/80 px-2 py-1 rounded text-gray-700">
            {language}
          </span>
        </div>

        {/* Complexity Info */}
        <div className="absolute bottom-4 right-4 text-right">
          <div className="text-xs font-mono text-gray-600 bg-white/80 px-2 py-1 rounded">
            <div>{timeComplexity}</div>
            <div>{spaceComplexity}</div>
          </div>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
      </div>

      {/* Card Content */}
      <div className="space-y-3">
        {/* Title */}
        <h3 className="font-light text-gray-900 leading-tight group-hover:text-black transition-colors">
          {title}
        </h3>

        {/* Author & Meta */}
        <div className="flex items-center justify-between text-sm font-light text-gray-600">
          <span>{author}</span>
          <div className="flex items-center gap-3">
            <span>{timeAgo}</span>
            <span className="flex items-center gap-1">
              <span>♡</span>
              <span>{likes}</span>
            </span>
          </div>
        </div>

        {/* Description - Hidden by default, shown on hover */}
        <p className="text-sm font-light text-gray-700 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-h-0 group-hover:max-h-20 overflow-hidden">
          {description.slice(0, 120)}...
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {tags.slice(0, 3).map((tag, index) => (
            <Badge
              key={index}
              variant="outline"
              className="border-gray-200 text-gray-600 rounded-full text-xs font-light hover:bg-black hover:text-white hover:border-black transition-colors"
            >
              {tag}
            </Badge>
          ))}
          {tags.length > 3 && (
            <Badge
              variant="outline"
              className="border-gray-200 text-gray-500 rounded-full text-xs font-light"
            >
              +{tags.length - 3}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}