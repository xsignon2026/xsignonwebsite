import type { AboutContent } from "@/types/about-content";

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

// "Meet our team": a card per person (square photo, accent bar, name, role, short bio).
// With no people yet it shows the heading only.
export function AboutTeam({ team }: { team: AboutContent["team"] }) {
  return (
    <section className="ab-sec" id="ab-team" data-nav="light">
      <div className="wrap">
        <h2 className="h2 rv">{team.title}</h2>
        {team.members.length === 0 && <p className="ab-team-empty">{team.emptyNote}</p>}
        {team.members.length > 0 && (
          <ul className="ab-team rv">
            {team.members.map((member) => (
              <li key={member.name + member.role}>
                <div className="ab-team-photo">
                  {member.photo ? (
                    // Plain img: the photo comes from the Sanity CDN, which the site's CSP already allows.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={member.photo}
                      alt={member.name}
                      width={480}
                      height={480}
                      loading="lazy"
                    />
                  ) : (
                    <span aria-hidden="true">{initials(member.name)}</span>
                  )}
                </div>
                <h3>{member.name}</h3>
                <p className="ab-team-role">{member.role}</p>
                {member.bio && <p className="ab-team-bio">{member.bio}</p>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
