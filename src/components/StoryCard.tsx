interface StoryCardProps {
  category: string;
  title: string;
  excerpt: string;
  author: string;
  image: string;
}

export const StoryCard = ({ category, title, excerpt, author, image }: StoryCardProps) => {
  return (
    <div className="group cursor-pointer flex flex-col bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 rounded-lg overflow-hidden">
      <div className="relative h-72 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-brand-charcoal/80 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 backdrop-blur-sm">
            {category}
          </span>
        </div>
      </div>
      <div className="p-8 flex flex-col flex-grow space-y-4">
        <h3 className="text-2xl font-serif-brand font-bold text-brand-charcoal leading-snug group-hover:text-brand-gold transition-colors">
          {title}
        </h3>
        <p className="text-base text-gray-500 leading-relaxed line-clamp-3 font-medium flex-grow">
          {excerpt}
        </p>
        <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
          <span className="text-sm font-bold text-brand-charcoal italic">— {author}</span>
          <div className="w-8 h-[2px] bg-brand-gold group-hover:w-12 transition-all duration-300"></div>
        </div>
      </div>
    </div>
  );
};
