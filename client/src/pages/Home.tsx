import { useMemo, useState } from "react";
import type { CSSProperties, FormEvent } from "react";
import {
  Bell,
  Bookmark,
  Check,
  ChevronDown,
  ChevronRight,
  CircleEllipsis,
  Code2,
  Compass,
  Feather,
  Globe2,
  GraduationCap,
  Heart,
  Image as ImageIcon,
  LockKeyhole,
  MessageCircle,
  MoreHorizontal,
  PenLine,
  Plus,
  Radio,
  Repeat2,
  Search,
  Send,
  Settings2,
  ShieldCheck,
  Sparkles,
  Terminal,
  Trophy,
  Users,
  X,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { startLogin } from "@/const";
import { gatekeeperPass } from "@shared/orbife";
import { signInWithSupabase, signUpWithSupabase } from "@/lib/supabase";

const avatars = {
  me: "https://i.pravatar.cc/96?img=12",
  aria: "https://i.pravatar.cc/96?img=47",
  dev: "https://i.pravatar.cc/96?img=11",
  nova: "https://i.pravatar.cc/96?img=32",
  campus: "https://i.pravatar.cc/96?img=44",
  kai: "https://i.pravatar.cc/96?img=68",
};

const hubs = [
  { name: "Mathematics", handle: "maths", members: "3.8k", color: "#78a6ff", icon: "π", locked: false },
  { name: "Coding Lab", handle: "coding", members: "8.2k", color: "#62e6bf", icon: "</>", locked: false },
  { name: "Public Speaking", handle: "speak", members: "1.4k", color: "#ffbd73", icon: "◉", locked: true },
];

const posts = [
  {
    id: 1,
    author: "Aria Sharma",
    handle: "ariacodes",
    time: "18m",
    avatar: avatars.aria,
    verified: true,
    text: "I finally understood why the gradient descent learning rate matters. Tiny changes, very different valleys. 🧠\n\nSharing my visual notes for anyone else stuck on it.",
    tags: ["#ML", "#notes"],
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1000&q=80",
    replies: 14,
    reposts: 32,
    likes: 186,
    views: "2.1k",
  },
  {
    id: 2,
    author: "Coding Lab",
    handle: "@codinglab",
    time: "42m",
    avatar: avatars.campus,
    verified: false,
    text: "Build night is live. Drop your smallest shippable idea below — we are pairing people into 45-minute sprints.",
    tags: ["#buildinpublic", "#campus"],
    replies: 28,
    reposts: 19,
    likes: 241,
    views: "3.8k",
  },
  {
    id: 3,
    author: "Kai Winters",
    handle: "kaiw",
    time: "1h",
    avatar: avatars.kai,
    verified: true,
    text: "A good community does two things: raises your standards and makes the climb feel less lonely.",
    tags: ["#orbife"],
    replies: 8,
    reposts: 11,
    likes: 98,
    views: "1.2k",
  },
];

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`brand-mark ${compact ? "brand-mark--compact" : ""}`} aria-label="Orbife">
      <span className="brand-orbit" />
      <span className="brand-word">orbi<span>fe</span></span>
    </div>
  );
}

function Avatar({ src, size = "md", online = false }: { src: string; size?: "sm" | "md" | "lg"; online?: boolean }) {
  return (
    <span className={`avatar avatar--${size}`}>
      <img src={src} alt="" />
      {online && <span className="online-dot" />}
    </span>
  );
}

function Verified() {
  return <span className="verified" aria-label="Verified"><Check size={10} strokeWidth={4} /></span>;
}

function LoginModal({ onClose }: { onClose: () => void }) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const result = mode === "login"
      ? await signInWithSupabase(email, password)
      : await signUpWithSupabase(email, password);
    if (result.configured) {
      if (result.error) {
        toast.error("That auth attempt needs another look", { description: result.error.message });
        return;
      }
      toast.success(mode === "login" ? "Welcome back to Orbife" : "Check your inbox to verify your account");
      onClose();
      return;
    }
    toast.info("Preview login is ready to connect", { description: "Add Supabase environment variables to enable email auth." });
    onClose();
    startLogin();
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="auth-modal" role="dialog" aria-modal="true" aria-label="Sign in to Orbife">
        <button className="icon-button auth-close" onClick={onClose} aria-label="Close login"><X size={18} /></button>
        <div className="auth-hero">
          <Logo />
          <div className="auth-spark"><Sparkles size={18} /></div>
        </div>
        <div className="auth-heading">
          <p className="eyebrow">Your campus, amplified</p>
          <h2>{mode === "login" ? "Welcome back" : "Join the orbit"}</h2>
          <p>{mode === "login" ? "Pick up where your curiosity left off." : "Find your people. Build in public. Learn out loud."}</p>
        </div>
        <div className="auth-tabs">
          <button className={mode === "login" ? "active" : ""} onClick={() => setMode("login")}>Sign in</button>
          <button className={mode === "signup" ? "active" : ""} onClick={() => setMode("signup")}>Create account</button>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>Email address<input type="email" placeholder="you@campus.edu" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
          <label>Password<input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required /></label>
          <button className="primary-button auth-submit" type="submit">{mode === "login" ? "Enter Orbife" : "Create my orbit"}<ChevronRight size={16} /></button>
        </form>
        <div className="auth-divider"><span>or continue with</span></div>
        <div className="auth-socials">
          <button onClick={() => { toast.info("Google SSO is ready to connect"); onClose(); }}><span className="google-g">G</span> Google</button>
          <button onClick={() => { toast.info("GitHub SSO is ready to connect"); onClose(); }}><Code2 size={15} /> GitHub</button>
        </div>
        <p className="auth-foot">By continuing, you agree to Orbife's <button>community guidelines</button>.</p>
      </div>
    </div>
  );
}

function ComposeModal({ onClose, onPost }: { onClose: () => void; onPost: (text: string) => void }) {
  const [text, setText] = useState("");
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="compose-modal" role="dialog" aria-modal="true" aria-label="Create a post">
        <div className="modal-topline"><span>New post</span><button className="icon-button" onClick={onClose} aria-label="Close composer"><X size={18} /></button></div>
        <div className="compose-row"><Avatar src={avatars.me} size="md" /><textarea autoFocus value={text} onChange={(e) => setText(e.target.value)} placeholder="What are you learning today?" maxLength={280} /></div>
        <div className="compose-bottom"><div className="compose-tools"><button onClick={() => toast.info("Media picker coming soon")}><ImageIcon size={18} /></button><button onClick={() => toast.info("Polls are coming soon")}><BarChartIcon /></button><span>{text.length}/280</span></div><button className="primary-button" disabled={!text.trim()} onClick={() => { onPost(text); onClose(); }}>Post</button></div>
      </div>
    </div>
  );
}

function BarChartIcon() {
  return <span className="bar-icon"><i /><i /><i /></span>;
}

function GatekeeperModal({ hub, onClose }: { hub: typeof hubs[number]; onClose: () => void }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const options = ["A sequence that never changes", "A sequence that converges", "Any random sequence", "Only a sequence with integers"];
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="gate-modal" role="dialog" aria-modal="true" aria-label={`${hub.name} gatekeeper`}>
        <div className="gate-illustration" style={{ "--hub-color": hub.color } as CSSProperties}><LockKeyhole size={32} /><span>SKILL GATE</span></div>
        <div className="modal-topline"><div><p className="eyebrow">One quick check</p><h2>Enter {hub.name}</h2></div><button className="icon-button" onClick={onClose} aria-label="Close gatekeeper"><X size={18} /></button></div>
        {!submitted ? <>
          <p className="gate-copy">This hub keeps conversations sharp with a tiny entry quiz. Pass once and you are in for good.</p>
          <div className="quiz-card"><div className="quiz-meta"><span>Question 1 of 5</span><span>~ 60 sec</span></div><div className="quiz-progress"><span style={{ width: "20%" }} /></div><h3>What does it mean for a sequence to be Cauchy?</h3><div className="quiz-options">{options.map((option, index) => <button key={option} className={selected === index ? "selected" : ""} onClick={() => setSelected(index)}><span>{String.fromCharCode(65 + index)}</span>{option}</button>)}</div></div>
          <button className="primary-button gate-submit" disabled={selected === null} onClick={() => {
            if (selected === 1 && gatekeeperPass(4)) setSubmitted(true);
            else { toast.error("Not quite — take another look at the definition."); setSelected(null); }
          }}>Check answer <ChevronRight size={16} /></button>
        </> : <div className="gate-success"><div className="success-orbit"><ShieldCheck size={34} /></div><h3>Nice work. You are in.</h3><p>Your skill badge is now attached to your Orbife profile. The {hub.name} channels are unlocked.</p><button className="primary-button" onClick={onClose}>Open the hub <ChevronRight size={16} /></button></div>}
      </div>
    </div>
  );
}

function PostCard({ post, liked, onLike }: { post: typeof posts[number]; liked: boolean; onLike: () => void }) {
  const [reposted, setReposted] = useState(false);
  const [saved, setSaved] = useState(false);
  return (
    <article className="post-card">
      <div className="post-main">
        <Avatar src={post.avatar} size="md" online={post.id === 2} />
        <div className="post-body">
          <div className="post-header"><div className="post-author"><strong>{post.author}</strong>{post.verified && <Verified />}<span className="post-handle">{post.handle}</span><span className="dot-sep">·</span><span className="post-time">{post.time}</span></div><button className="icon-button muted-icon" aria-label="More post options" onClick={() => toast.info("Post menu coming soon")}><MoreHorizontal size={18} /></button></div>
          <p className="post-text">{post.text.split("\n").map((line, i) => <span key={i}>{line}{i < post.text.split("\n").length - 1 && <br />}</span>)}</p>
          <div className="post-tags">{post.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          {post.image && <div className="post-media"><img src={post.image} alt="Coding notes shared by the Orbife community" /><span className="media-label"><Terminal size={12} /> visual notes</span></div>}
          <div className="post-actions">
            <button onClick={() => toast.info("Reply composer coming soon")}><MessageCircle size={18} /><span>{post.replies}</span></button>
            <button className={reposted ? "action-active action-green" : ""} onClick={() => { setReposted(!reposted); toast.success(reposted ? "Repost removed" : "Reposted to your orbit"); }}><Repeat2 size={18} /><span>{post.reposts + (reposted ? 1 : 0)}</span></button>
            <button className={liked ? "action-active action-pink" : ""} onClick={onLike}><Heart size={18} fill={liked ? "currentColor" : "none"} /><span>{post.likes + (liked ? 1 : 0)}</span></button>
            <button><BarChartIcon /><span>{post.views}</span></button>
            <button className={saved ? "action-active action-blue" : ""} onClick={() => { setSaved(!saved); toast.success(saved ? "Removed from saved" : "Saved for later"); }}><Bookmark size={18} fill={saved ? "currentColor" : "none"} /></button>
          </div>
        </div>
      </div>
    </article>
  );
}

function LeftRail({ active, onNav, onCompose, onLogin }: { active: string; onNav: (label: string) => void; onCompose: () => void; onLogin: () => void }) {
  const items = [{ label: "Home", icon: Feather }, { label: "Explore", icon: Search }, { label: "Hubs", icon: Users }, { label: "Messages", icon: MessageCircle }, { label: "Notifications", icon: Bell }];
  return (
    <aside className="left-rail">
      <div className="rail-top"><Logo compact /><button className="rail-search" onClick={() => onNav("Explore")}><Search size={19} /><span>Search Orbife</span><kbd>⌘ K</kbd></button></div>
      <nav className="primary-nav">{items.map(({ label, icon: Icon }) => <button key={label} className={active === label ? "nav-item active" : "nav-item"} onClick={() => onNav(label)}><Icon size={21} strokeWidth={active === label ? 2.5 : 1.8} /><span>{label}</span>{label === "Notifications" && <b className="notification-count">3</b>}</button>)}</nav>
      <div className="rail-section"><p className="rail-label">Your hubs <button onClick={() => onNav("Hubs")}><Plus size={14} /></button></p>{hubs.map((hub) => <button key={hub.name} className="hub-nav" onClick={() => onNav(hub.name)}><span className="hub-dot" style={{ background: hub.color }}>{hub.icon}</span><span>{hub.name}</span>{hub.locked && <LockKeyhole size={13} />}</button>)}</div>
      <div className="rail-bottom"><button className="profile-chip" onClick={onLogin}><Avatar src={avatars.me} size="sm" online /><span><strong>Riya Kapoor</strong><small>@riya.builds</small></span><MoreHorizontal size={18} /></button><button className="settings-row" onClick={() => toast.info("Settings coming soon")}><Settings2 size={17} /> Settings</button></div>
    </aside>
  );
}

function RightRail({ onHub }: { onHub: (hub: typeof hubs[number]) => void }) {
  return (
    <aside className="right-rail">
      <div className="right-card profile-card"><div className="profile-cover" /><div className="profile-card-body"><div className="profile-head"><Avatar src={avatars.me} size="lg" online /><button className="outline-button" onClick={() => toast.info("Profile editor coming soon")}>Edit profile</button></div><h3>Riya Kapoor <Verified /></h3><p className="handle">@riya.builds</p><p className="bio">Building in public, learning in community. <span>✦</span></p><div className="profile-stats"><span><b>268</b> following</span><span><b>1.4k</b> followers</span></div></div></div>
      <div className="right-card hub-card"><div className="card-heading"><h3>Suggested hubs</h3><button onClick={() => toast.info("All hubs view coming soon")}>View all</button></div>{hubs.map((hub, index) => <div className="suggested-hub" key={hub.name}><span className="hub-icon-large" style={{ color: hub.color, borderColor: `${hub.color}50` }}>{hub.icon}</span><div><strong>{hub.name}</strong><span>{hub.members} learners · {index + 2} channels</span></div><button className="join-button" onClick={() => onHub(hub)}>{hub.locked ? <LockKeyhole size={14} /> : "Join"}</button></div>)}</div>
      <div className="right-card pulse-card"><div className="pulse-orb"><Radio size={17} /></div><div><p className="eyebrow">Live on Orbife</p><h3>Build night</h3><p>42 people are pairing up in Coding Lab.</p></div><ChevronRight size={17} /></div>
      <div className="right-footer"><span>Orbife © 2026</span><button onClick={() => toast.info("Community guidelines coming soon")}>Guidelines</button><button onClick={() => toast.info("Privacy policy coming soon")}>Privacy</button><button onClick={() => toast.info("About Orbife coming soon")}>About</button></div>
    </aside>
  );
}

function MobileNav({ active, onNav, onCompose }: { active: string; onNav: (label: string) => void; onCompose: () => void }) {
  return <div className="mobile-nav"><button className={active === "Home" ? "active" : ""} onClick={() => onNav("Home")}><Feather size={21} /></button><button className={active === "Explore" ? "active" : ""} onClick={() => onNav("Explore")}><Search size={21} /></button><button className="mobile-compose" onClick={onCompose}><Plus size={25} /></button><button className={active === "Notifications" ? "active" : ""} onClick={() => onNav("Notifications")}><Bell size={21} /></button><button className={active === "Messages" ? "active" : ""} onClick={() => onNav("Messages")}><MessageCircle size={21} /></button></div>;
}

export default function Home() {
  const [active, setActive] = useState("Home");
  const [feed, setFeed] = useState<"for-you" | "following">("for-you");
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [showLogin, setShowLogin] = useState(false);
  const [showCompose, setShowCompose] = useState(false);
  const [gateHub, setGateHub] = useState<typeof hubs[number] | null>(null);
  const [localPosts, setLocalPosts] = useState(posts);

  const displayedPosts = useMemo(() => active === "Home" ? localPosts : localPosts.slice(0, 2), [active, localPosts]);

  function navTo(label: string) {
    setActive(label);
    if (label === "Home") return;
    if (label === "Hubs") setGateHub(hubs[0]);
    else toast.info(`${label} is ready for your next integration`);
  }

  function addPost(text: string) {
    setLocalPosts((prev) => [{ id: Date.now(), author: "Riya Kapoor", handle: "@riya.builds", time: "now", avatar: avatars.me, verified: true, text, tags: ["#learninginpublic"], replies: 0, reposts: 0, likes: 0, views: "0" }, ...prev]);
    toast.success("Post shared with your orbit");
  }

  return (
    <div className="orbife-app">
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <LeftRail active={active} onNav={navTo} onCompose={() => setShowCompose(true)} onLogin={() => setShowLogin(true)} />
      <main className="main-column">
        <header className="mobile-header"><Logo /><button className="icon-button" onClick={() => setShowLogin(true)}><Avatar src={avatars.me} size="sm" online /></button></header>
        <div className="feed-header"><div className="feed-title-row"><h1>{active === "Home" ? "Home" : active}</h1><button className="feed-spark" onClick={() => toast.info("Feed tuned to your learning graph")}><Sparkles size={17} /></button></div><div className="feed-tabs"><button className={feed === "for-you" ? "active" : ""} onClick={() => setFeed("for-you")}>For you</button><button className={feed === "following" ? "active" : ""} onClick={() => setFeed("following")}>Following</button></div></div>
        <section className="composer-card"><Avatar src={avatars.me} size="md" /><button className="composer-placeholder" onClick={() => setShowCompose(true)}>What are you learning today, Riya?</button><button className="composer-send" onClick={() => setShowCompose(true)}><Send size={17} /></button></section>
        <div className="feed-notice"><Globe2 size={14} /><span>Federated timeline · connected to the open web</span><button onClick={() => toast.info("ActivityPub federation settings coming soon")}><CircleEllipsis size={15} /></button></div>
        <section className="feed-list">{displayedPosts.map((post) => <PostCard key={post.id} post={post} liked={likedPosts.includes(post.id)} onLike={() => setLikedPosts((prev) => prev.includes(post.id) ? prev.filter((id) => id !== post.id) : [...prev, post.id])} />)}</section>
        <div className="feed-end"><div className="end-icon"><Trophy size={16} /></div><p>You're all caught up</p><span>More thoughtful conversations are on the way.</span></div>
      </main>
      <RightRail onHub={setGateHub} />
      <button className="floating-compose" onClick={() => setShowCompose(true)} aria-label="Create post"><Plus size={27} /></button>
      <MobileNav active={active} onNav={navTo} onCompose={() => setShowCompose(true)} />
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showCompose && <ComposeModal onClose={() => setShowCompose(false)} onPost={addPost} />}
      {gateHub && <GatekeeperModal hub={gateHub} onClose={() => setGateHub(null)} />}
    </div>
  );
}
