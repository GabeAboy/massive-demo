insert into incidents
  (us_state,injury_id,cause_id)
  values($1,$2,$3)
  returning us_state, injury_id, cause_id
